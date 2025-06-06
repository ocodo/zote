/** AsterixMatch, a very simple glob search */
export function asterixMatch(pattern: string, str: string): boolean {
    let patternIndex: number = 0;
    let strIndex: number = 0;
    let starIndex: number = -1;
    let matchIndex: number = 0;

    if (str.includes(pattern)) return true

    while (strIndex < str.length) {

        if (patternIndex < pattern.length && (pattern[patternIndex] === str[strIndex] || pattern[patternIndex] === '*')) {
            if (pattern[patternIndex] === '*') {
                starIndex = patternIndex;
                matchIndex = strIndex;
                patternIndex++;
            } else {
                patternIndex++;
                strIndex++;
            }
        } else if (starIndex !== -1) {
            patternIndex = starIndex + 1;
            strIndex = matchIndex + 1;
            matchIndex = strIndex;
        } else {
            return false;
        }
    }

    while (patternIndex < pattern.length && pattern[patternIndex] === '*') {
        patternIndex++;
    }

    return patternIndex === pattern.length;
}

export function searchStrings(pattern: string, strings: ReadonlyArray<string>): string[] {
    if (typeof pattern !== 'string') {
        throw new TypeError("Pattern must be a string");
    }

    if (pattern === '') {
        throw new Error("Pattern cannot be an empty string");
    }

    if (!Array.isArray(strings)) {
        throw new TypeError("The input must be an array of strings");
    }

    if (strings.some(item => typeof item !== 'string')) {
        throw new TypeError("Each item in the array must be a string");
    }

    const matches: string[] = [];

    for (const str of strings) {
        if (asterixMatch(pattern, str)) {
            matches.push(str);
        }
    }

    return matches;
}
