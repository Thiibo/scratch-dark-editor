import { dirname } from 'node:path';
import { readFile, readJsonFile, readYamlFile, resolvePath } from './fs';

const classMappings = {
    ...await readJsonFile("@/build/class-mappings/generated.json"),
    ...await readYamlFile("@/build/class-mappings/manual.yaml")
};

class CssFile {
    filePath: string
    private parsedContent: string

    constructor(filePath: string) {
        this.filePath = resolvePath(filePath);
    }

    async parse(): Promise<string> {
        if (this.parsedContent) return this.parsedContent;

        let content = await readFile(this.filePath);
        content = await this.resolveFileReferences(content);
        content = CssFile.resolveClassMappings(content);
        
        this.parsedContent = content;
        return content;
    }

    private async resolveFileReferences(source: string): Promise<string> {
        const FILE_REFERENCE_REGEX = /^([ \t]*?)\/\*\[\"(.*?)\"\]\*\//m;

        let match: RegExpExecArray | null;
        while ((match = FILE_REFERENCE_REGEX.exec(source)) !== null) {
            const whitespace = match[1];
            const url = match[2];
            try {
                const fileContent = await readFile(dirname(this.filePath), url);
                const indentedFileContent = whitespace + fileContent.replaceAll("\n", `\n${whitespace}`);
                source = source.replace(FILE_REFERENCE_REGEX, indentedFileContent);
            } catch (err) {
                source = source.replace(FILE_REFERENCE_REGEX, "/*[<Error: could not resolve file reference>]*/");
                console.log(`Warning: could not resolve file reference '${url}' in ${this.filePath}`);
            }
        }

        return source;
    }

    private static resolveClassMappings(source: string): string {
        let result = source;
        for (const [id, targetClass] of Object.entries(classMappings)) {
            const re = new RegExp(`§${id}(?![a-zA-Z0-9])`, 'g');
            result = result.replaceAll(re, `.${targetClass}`);
        }
        return result;
    }
}

export default {
    baseCss: new CssFile("@/src/base.css"),
    backgroundImageEnabled: new CssFile("@/src/background-image-enabled.css")
};
