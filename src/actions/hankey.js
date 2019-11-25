import {
    allKoreanCharacters
} from '../core/keys'
// actions

export const PRESS_KEY = 'PRESS_KEY'
export const IGNORE_INPUTS = 'IGNORE_INPUTS'
export const CHANGE_MODE = 'CHANGE_MODE'

// action creators
export function changeMode(mode) {
    return {
        type: CHANGE_MODE,
        mode,
    }
}

export function pressKey(key) {
    return {
        type: PRESS_KEY,
        key,
        pressDate: new Date(),
        random: allKoreanCharacters.map(_ => Math.random())
    }
}

export function ignoreInputs(yayOrNay) {
    return {
        type: IGNORE_INPUTS,
        ignore: yayOrNay
    }
}