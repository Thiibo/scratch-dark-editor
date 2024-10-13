function extractAllRegexCaptureGroups(source: string, regex: RegExp, matchIndex: number): string[] {
    const extractedStrings: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(source)) !== null) {
        extractedStrings.push(match[matchIndex]);
    }

    return extractedStrings;
}

function interpretKeyValueObjectString(string: string) {
    return string.split(',').reduce((acc, keyValueLine) => {
        const [key, value] = keyValueLine.split(':');
        acc[key.replaceAll('"', '')] = value.replaceAll('"', '');
        return acc;
    }, {});
}

function removeKeysWithHyphens(obj: {[key: string]: any}) {
    const shallowCopy = Object.assign({}, obj);
    Object.keys(shallowCopy).filter(key => /\-/.test(key)).forEach(key => delete shallowCopy[key]);
    return shallowCopy;
}

export { extractAllRegexCaptureGroups, interpretKeyValueObjectString, removeKeysWithHyphens }
