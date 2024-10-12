import * as fs from 'node:fs';
import * as path from 'node:path';
import {fileURLToPath} from 'url';
import { extractAllRegexCaptureGroups, interpretKeyValueObjectString } from "./modules/helper-functions";

const MAPPING_EXTRACTION_REGEX = /a\.locals\s*=\s*\{([^}]*)\}/g;
const SCRATCH_WEBPACK_BUNDLE_SOURCE = "https://scratch.mit.edu/js/projects.bundle.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type StringKeyValueObject = {[name: string]: string}

async function getClassMappings(): Promise<StringKeyValueObject> {
    const res = await fetch(SCRATCH_WEBPACK_BUNDLE_SOURCE);
    const webpackCode = await res.text();
    const keyValueObjectStrings = extractAllRegexCaptureGroups(webpackCode, MAPPING_EXTRACTION_REGEX, 1);

    return keyValueObjectStrings.reduce((acc, string) => ({ ...acc, ...interpretKeyValueObjectString(string) }), {});
}

const outPath = path.join(__dirname, 'class-mappings.json');
const classMappings = await getClassMappings();
fs.writeFileSync(outPath, JSON.stringify(classMappings));
