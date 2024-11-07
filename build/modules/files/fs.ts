import * as path from 'node:path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs/promises';
import * as yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "../../../");

function resolvePath(...pathSegments: string[]): string {
    let fullPath = pathSegments[0];
    for (let i = 1; i < pathSegments.length; i++) {
        fullPath = path.resolve(fullPath, pathSegments[i]);
    }

    return fullPath.replace('@', ROOT_DIR);
}

async function readDir(...dirPathSegments: string[]): Promise<string[]> {
    const fullPath = resolvePath(...dirPathSegments);
    const files = await fs.readdir(fullPath);
    return files.map(filePath => path.resolve(fullPath, filePath));
}

function readFile(...filePathSegments: string[]): Promise<string> {
    const fullPath = resolvePath(...filePathSegments);
    return fs.readFile(fullPath, 'utf-8');
}

async function readJsonFile(filePath: string): Promise<{[key: string]: any}> {
    const content = await readFile(filePath);
    return JSON.parse(content);
}

async function readYamlFile(filePath: string): Promise<{[key: string]: any}> {
    const content = await readFile(filePath);
    return yaml.load(content);
}

export {
    resolvePath,
    readDir,
    readFile,
    readJsonFile,
    readYamlFile
}
