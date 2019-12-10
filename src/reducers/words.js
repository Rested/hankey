import { PRESS_KEY } from "../actions/hankey";
import { MODE_WORDS } from "../constants";
import { englishToHangul } from "../core/keys";
import {frequencyOrderedWords} from '../core/words';
import initialState from "../stores/initialState";
import {disassemble, assemble} from 'hangul-js';

function isNextCharacter(targetWord, wordProgress, character){
    console.log('end str',  disassemble(targetWord).splice(0, wordProgress.length))
    const word = disassemble(targetWord);
    word.splice(0, disassemble(wordProgress).length)
    return character === word[0];
}

function joinCharacterWithProgress(wordProgress, character){
    return assemble([...disassemble(wordProgress), character])
}

function words(state = initialState, action){
    switch(action.type){
        case PRESS_KEY:
            if (action.mode !== MODE_WORDS) return state;
            const characterPressed = englishToHangul[action.key];
            if (isNextCharacter(state.currentWord, state.currentWordProgress, characterPressed)){
                const newWordProgress = joinCharacterWithProgress(state.currentWordProgress, characterPressed);
                if (newWordProgress === state.currentWord){
                    return {
                        ...state,
                        currentWord: frequencyOrderedWords[(frequencyOrderedWords.indexOf(state.currentWord) + 1) % frequencyOrderedWords.length],
                        currentWordProgress: '',
                        currentWordErrors: [],
                        currentWordStartDateTime: null,
                        history: [...state.history, {
                            word: state.currentWord,
                            startDateTime: state.currentWordStartDateTime,
                            endDateTime: action.pressDate,
                            errors: state.currentWordErrors,
                        }],
                        streak: state.streak + 1,
                    }
                }
                return {
                    ...state,
                    currentWordProgress: newWordProgress,
                    streak: state.streak + 1,
                    currentWordStartDateTime: state.currentWordStartDateTime || action.pressDate,
                }
            }
            return {
                ...state,
                currentWordStartDateTime: state.currentWordStartDateTime || action.pressDate,
                currentWordErrors: [...state.currentWordErrors, characterPressed],
                streak: 0,
            };
        default:
            return state;
    }
}

export default words;