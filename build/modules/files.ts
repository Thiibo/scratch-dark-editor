import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATHS = Object.freeze({
    themesFolder: path.resolve(__dirname, "../../src/themes"),
    header: path.resolve(__dirname, "../../src/header.txt"),
    baseCss: path.resolve(__dirname, "../../src/base.css"),
    backgroundImageEnabled: path.resolve(__dirname, "../../src/background-image-enabled.css"),
    generatedClassMappings: path.resolve(__dirname, "../class-mappings/generated.json"),
    manualClassMappings: path.resolve(__dirname, "../class-mappings/manual.yaml"),
});

const THEME_NAME_EXTRACTION_REGEX = /\/\*\*\* (.*?) \*\*\*\/\n?/;

async function getThemes(): Promise<Theme[]> {
    const filePaths = await fs.readdir(FILE_PATHS.themesFolder);
    const absoluteFilePaths = filePaths.map(filePath => path.resolve(FILE_PATHS.themesFolder, filePath));
    return Promise.all(absoluteFilePaths.map(getThemeFileInfo));
}

async function getThemeFileInfo(filePath: string): Promise<Theme> {
    const absolutePath = path.resolve(filePath);
    const id = path.basename(absolutePath).split('.')[0];
    const fileContent = await fs.readFile(absolutePath, 'utf-8');
    const nameMatch = THEME_NAME_EXTRACTION_REGEX.exec(fileContent);
    if (!nameMatch) throw Error(`No theme name found in theme file at ${absolutePath}. Please define a name using the syntax '/*** THEME NAME ***/'.`);
    const name = nameMatch[1];
    const themeContent = fileContent.replace(THEME_NAME_EXTRACTION_REGEX, '');
    
    return {
        path: absolutePath,
        id: id,
        name: name,
        content: themeContent
    };
}

export default {
    themes: await getThemes(),
    header: await fs.readFile(FILE_PATHS.header, 'utf-8'),
    baseCss: await fs.readFile(FILE_PATHS.baseCss, 'utf-8'),
    backgroundImageEnabled: await fs.readFile(FILE_PATHS.backgroundImageEnabled, 'utf-8'),
    generatedClassMappings: await fs.readFile(FILE_PATHS.generatedClassMappings, 'utf-8'),
    manualClassMappings:  await fs.readFile(FILE_PATHS.manualClassMappings, 'utf-8'),
};
