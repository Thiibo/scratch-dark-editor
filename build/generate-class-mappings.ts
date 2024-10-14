import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { extractAllRegexCaptureGroups, interpretKeyValueObjectString, removeKeysWithHyphens } from "./modules/helper-functions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAPPING_EXTRACTION_REGEX = /a\.locals\s*=\s*\{([^}]*)\}/g;
const SCRATCH_WEBPACK_BUNDLE_SOURCE = "https://scratch.mit.edu/js/projects.bundle.js"

async function getClassMappings(): Promise<StringKeyValueObject> {
    const res = await fetch(SCRATCH_WEBPACK_BUNDLE_SOURCE);
    const webpackCode = await res.text();
    const keyValueObjectStrings = extractAllRegexCaptureGroups(webpackCode, MAPPING_EXTRACTION_REGEX, 1);
    const fullClassMappings: StringKeyValueObject = keyValueObjectStrings.reduce((acc, string) => ({ ...acc, ...interpretKeyValueObjectString(string) }), {});
    for (const [key, value] of Object.entries(fullClassMappings)) fullClassMappings[key] = value.replaceAll('+', '\\+');
    
    return removeKeysWithHyphens(fullClassMappings);
}

const outPath = path.join(__dirname, 'class-mappings', 'generated.json');
const classMappings = await getClassMappings();

fs.writeFileSync(outPath, JSON.stringify(classMappings));
console.log("Exported class mappings.");
