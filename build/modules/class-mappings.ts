import { extractAllRegexCaptureGroups, interpretKeyValueObjectString } from "./helper-functions";

type StringKeyValueObject = {[name: string]: string}

const MAPPING_EXTRACTION_REGEX = /a\.locals\s*=\s*\{([^}]*)\}/g;
const SCRATCH_WEBPACK_BUNDLE_SOURCE = "https://scratch.mit.edu/js/projects.bundle.js"

async function getClassMappings(): Promise<StringKeyValueObject> {
    const res = await fetch(SCRATCH_WEBPACK_BUNDLE_SOURCE);
    const webpackCode = await res.text();
    const keyValueObjectStrings = extractAllRegexCaptureGroups(webpackCode, MAPPING_EXTRACTION_REGEX, 1);

    return keyValueObjectStrings.reduce((acc, string) => ({ ...acc, ...interpretKeyValueObjectString(string) }), {});
}

export { getClassMappings };
