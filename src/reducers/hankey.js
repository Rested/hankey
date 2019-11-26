import {
    CHANGE_MODE,
    IGNORE_INPUTS,
    PRESS_KEY
} from '../actions/hankey';
import {
    MODE_GAME
} from '../constants';
import frequencyOrdered from '../core/frequencies';
import {
    allKoreanCharacters,
    englishToHangul,
    hangulPrimaryToSecondary,
    isSecondary
} from '../core/keys';
import supermemo2 from '../core/supermemo2';





function keyMatchesTarget(keyEnglish, targetHangul) {
    return englishToHangul[keyEnglish] === targetHangul;
}

function getKeySchedule(keyState, character) {
    const key = keyState.find(k => k.character === character.character)
    return key.lastSchedule;
}

function getNextCharacter(keyState, recents) {
    const sortedBySchedule = [...keyState].sort((charA, charB) => {
        const val = (charA.lastSchedule || 0) - (charB.lastSchedule || 0)
        return val;
    }).filter(c => !recents.includes(c.character));
    console.log('by schedule', sortedBySchedule)
    const getOnlyTheSoonest = sortedBySchedule.filter((val, indx, arr) => (getKeySchedule(keyState, val) || 0) === (getKeySchedule(keyState, arr[0]) || 0))
    console.log('soonest', getOnlyTheSoonest)
    if (getOnlyTheSoonest.length === sortedBySchedule.length) {
        let nextChar = frequencyOrdered[(frequencyOrdered.indexOf(recents[recents.length - 1]) + 1) % frequencyOrdered.length]
        console.log('next char 1', nextChar);
        return nextChar;
    }
    const sortSoonestByFrequency = getOnlyTheSoonest.sort((k1, k2) => frequencyOrdered.indexOf(k1.character) - frequencyOrdered.indexOf(k2.character));
    console.log('nc3')
    return sortSoonestByFrequency[0].character;
}

function hankeyApp(state, action) {

    switch (action.type) {
        case IGNORE_INPUTS:
            if (state.mode !== MODE_GAME) return state;
            return {
                ...state,
                ignoreInputs: action.ignore
            }
            case CHANGE_MODE:
                return {
                    ...state,
                    mode: action.mode,
                }
                case PRESS_KEY:
                    if (state.mode !== MODE_GAME) return state;
                    if (!Object.keys(englishToHangul).includes(action.key)) return state;
                    if (state.ignoreInputs) return state;
                    if (state.disabledKeys.includes(englishToHangul[action.key])) return state;
                    if (state.keypresses.includes(englishToHangul[action.key])) return state;
                    if (keyMatchesTarget(action.key, state.targetCharacter)) {
                        const newState = state.keyState.map((key) => {
                            if (key.character === state.targetCharacter) {
                                const {
                                    schedule,
                                    factor,
                                } = supermemo2(Math.max(5 - state.keypresses.length, 0), key.lastSchedule, key.lastFactor)
                                return {
                                    ...key,
                                    lastFactor: factor,
                                    lastSchedule: schedule,
                                    pressedDate: action.pressDate,
                                }
                            }
                            return key
                        })
                        let recentSuccesses = [...(state.recentSuccesses || []), state.targetCharacter]
                        return {
                            ...state,
                            keypresses: [],
                            disabledKeys: [],
                            ignoreInputs: false,
                            keyState: newState,
                            targetCharacter: getNextCharacter(newState, recentSuccesses),
                            recentSuccesses: recentSuccesses.slice(Math.max(recentSuccesses.length - 5, 0))
                        }
                    }
                    const sotedFilteredKeys = [...allKoreanCharacters].sort((a, b) => action.random[allKoreanCharacters.indexOf(a)] - 0.5)
                        .filter(c => !state.disabledKeys.includes(c) && !isSecondary(c) && state.targetCharacter !== c && c !== englishToHangul[action.key] && hangulPrimaryToSecondary[c] !== state.targetCharacter);
                    const firstFour = sotedFilteredKeys.slice(0, 4)
                    console.log('frst 4', firstFour)
                    return {
                        ...state,
                        disabledKeys: [...state.disabledKeys, englishToHangul[action.key], ...firstFour],
                            keypresses: [...state.keypresses, englishToHangul[action.key]]
                    }

                    default:
                        return state
    }
}

export default hankeyApp;