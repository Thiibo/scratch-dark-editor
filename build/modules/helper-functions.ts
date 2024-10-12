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

export { extractAllRegexCaptureGroups, interpretKeyValueObjectString }
