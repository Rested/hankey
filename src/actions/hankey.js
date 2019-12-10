import {
    allKoreanCharacters
} from '../core/keys'

// actions

export const PRESS_KEY = 'PRESS_KEY'
export const CHANGE_MODE = 'CHANGE_MODE'

// action creators
export function changeMode(mode) {
    return {
        type: CHANGE_MODE,
        mode,
    }
}

export function pressKey(key, mode) {
    return {
        type: PRESS_KEY,
        key,
        mode,
        pressDate: new Date(),
        random: allKoreanCharacters.map(_ => Math.random()),
    }
}
