import * as fs from 'node:fs';
import * as path from 'node:path';
import { userConfig } from "./user-config";
import { fileURLToPath } from 'url';
import files from "./modules/files";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageVersion = process.env.npm_package_version;

function getUserCss(): string {
    const header = files.header.replaceAll('{{VERSION}}', packageVersion);
    return `/* ==UserStyle==\n${header}\n${getUserCssSettings()}\n==/UserStyle== */\n\n${files.baseCss}`;
}

function getUserCssSettings(): string {
    let result = "";
    for (const [settingId, settingData] of Object.entries(userConfig)) {
        switch (settingData.type) {
            case "dropdown":
            case "image":
                result += `@advanced dropdown ${settingId} \"${settingData.title}\" {{\n`
                for (let [optionId, optionData] of Object.entries(settingData.options)) {
                    const optionFullId = `${settingId}--${optionId}`
                    result += `\t${optionFullId} \"${optionData.title}${settingData.default === optionId ? '*' : ''}\" <<<EOT ${optionData.content} EOT;\n`
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

const outPath = path.join(__dirname, 'out', `scratch-dark-editor-${packageVersion}.user.css`);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, getUserCss());
