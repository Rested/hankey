import { resolveWithPrefix } from "jest-config/build/utils";

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

export function characterPosition(character){
    keyboard.forEach((row, rowIndex) => row.forEach((characters, columnIndex) => {
        if (characters.includes(character)){
            return rowIndex, columnIndex
        }
    })
} 

export const mappedKeyboard = keyboard.map(row => row.map(([korean, koreanSecondary, english]) => ({
    korean,
    koreanSecondary,
    english,
})));