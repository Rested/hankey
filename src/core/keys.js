export const keyboard = [
    [
        ['ㅂ', 'ㅃ', 'Q'],
        ['ㅈ', 'ㅉ', 'W'],
        ['ㄷ', 'ㄸ', 'E'],
        ['ㄱ', 'ㄲ', 'R'],
        ['ㅅ', 'ㅆ', 'T'],
        ['ㅛ', null, 'Y'],
        ['ㅕ', null, 'U'],
        ['ㅑ', null, 'I'],
        ['ㅐ', 'ㅒ', 'O'],
        ['ㅔ', 'ㅖ', 'P'],
    ],
    [
        ['ㅁ', null, 'A'],
        ['ㄴ', null, 'S'],
        ['ㅇ', null, 'D'],
        ['ㄹ', null, 'F'],
        ['ㅎ', null, 'G'],
        ['ㅗ', null, 'H'],
        ['ㅓ', null, 'J'],
        ['ㅏ', null, 'K'],
        ['ㅣ', null, 'L'],
    ],
    [
        ['ㅋ', null, 'Z'],
        ['ㅌ', null, 'X'],
        ['ㅊ', null, 'C'],
        ['ㅍ', null, 'V'],
        ['ㅠ', null, 'B'],
        ['ㅜ', null, 'N'],
        ['ㅡ', null, 'M'],
    ]
]

export const allKoreanCharacters = keyboard.reduce((acc, row) => {
    row.forEach((key) => {
        acc.push(key[0])
        if (key[1] !== null) acc.push(key[1])
    });
    return acc;
}, []);

export const hangulToEnglish = (hangul) => {
    let english;
    keyboard.forEach(row => {
        row.forEach(charset => {
            if (charset[0] === hangul || charset[1] === hangul) {
                english = charset[2]
            }
        })
    })
    return english;
}

export const hangulPrimaryToSecondary = (() => {
    const mapping = {}
    for (const row of keyboard) {
        for (const charset of row) {
            mapping[charset[0]] = charset[1]
        }
    }
    return mapping
})()

export const englishToHangul = (() => {
    let englishMap = {};
    keyboard.forEach(row => {
        row.forEach(charset => {
            if (charset[1] !== null) {
                englishMap[charset[2].toUpperCase()] = charset[1]
            } else {
                englishMap[charset[2].toUpperCase()] = charset[0]
            }
            englishMap[charset[2].toLowerCase()] = charset[0]
        })
    })
    return englishMap;
})();


export const isSecondary = (character) => {
    let isSecondary = false;
    keyboard.forEach((row) => row.forEach(c => {
        if (c[1] === character) {
            isSecondary = true;
        }
    }))
    return isSecondary;
}

export const getCharacterPosition = (character) => {
    let returnValue = {}
    keyboard.forEach((row, rowIndex) => row.forEach((characters, columnIndex) => {
        if (characters.includes(character)) {
            returnValue = {
                rowIndex,
                columnIndex
            }
        }
    }));
    return returnValue;
}

export const mappedKeyboard = keyboard.map(row => row.map(([korean, koreanSecondary, english]) => ({
    korean,
    koreanSecondary,
    english,
})));