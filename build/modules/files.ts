import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const THEMES_PATH = "../../style/themes";
const THEME_NAME_EXTRACTION_REGEX = /\/\*\*\* (.*?) \*\*\*\/\n?/;

async function getThemes(): Promise<Theme[]> {
    const files = await fs.readdir(THEMES_PATH);
    return Promise.all(files.map(getThemeFileInfo));
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
    themes: await getThemes()
};
