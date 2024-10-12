import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const THEMES_PATH = "../../style/themes";

type Theme = {
    path: string,
    name: string,
    content: string
}

async function getThemes(): Promise<Theme[]> {
    const files = await fs.readdir(THEMES_PATH);
    return Promise.all(files.map(getThemeFileInfo));
}

async function getThemeFileInfo(filePath: string): Promise<Theme> {
    const absolutePath = path.resolve(filePath);
    const name = path.basename(absolutePath).split('.')[0];
    const content = await fs.readFile(absolutePath, 'utf-8');
    
    return {
        path: absolutePath,
        name: name,
        content: content
    }
}

export default {
    themes: await getThemes()
};
