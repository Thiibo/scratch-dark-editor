import * as fs from 'node:fs';
import * as path from 'node:path';
import { userConfig } from "./user-config";
import { fileURLToPath } from 'url';
import files from "./modules/files";
import * as yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageVersion = process.env.npm_package_version;

const classMappings = {
    ...JSON.parse(files.generatedClassMappings) as {[key: string]: string},
    ...yaml.load(files.manualClassMappings) as {[key: string]: string}
};

function getUserCss(): string {
    const header = files.header.replaceAll('{{VERSION}}', packageVersion);
    const baseCss = resolveClassMappings(files.baseCss);
    return `/* ==UserStyle==\n${header}\n${getUserCssSettings()}\n==/UserStyle== */\n\n${baseCss}`;
}

function getUserCssSettings(): string {
    let result = "";
    for (const [settingId, settingData] of Object.entries(userConfig)) {
        switch (settingData.type) {
            case "dropdown":
            case "image":
                result += `@advanced dropdown ${settingId} \"${settingData.title}\" {{\n`
                for (let [optionId, optionData] of Object.entries(settingData.options)) {
                    const optionFullId = `${settingId}--${optionId}`;
                    result += `\t${optionFullId} \"${optionData.title}${settingData.default === optionId ? '*' : ''}\" <<<EOT ${resolveClassMappings(optionData.content)} EOT;\n`
                }
                result += "}\n"
                break;

            case "color":
                result += `@advanced color ${settingId} \"${settingData.title}\" ${settingData.default}\n`
                break;
        }
    }

    return result.replaceAll("*/", "*\\/");
}

function resolveClassMappings(source: string): string {
    let result = source;
    for (const [id, targetClass] of Object.entries(classMappings)) {
        const re = new RegExp(`§${id}(?![a-zA-Z])`, 'g');
        result = result.replaceAll(re, `.${targetClass}`);
    }
    return result;
}

const outPath = path.join(__dirname, 'out', `scratch-dark-editor-${packageVersion}.user.css`);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, getUserCss());
console.log("Exported user CSS file.");
