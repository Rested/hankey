import {allKoreanCharacters} from '../core/keys';
import frequencyOrdered from '../core/frequencies';
import {frequencyOrderedWords} from '../core/words';
import {MODE_GAME} from '../constants';

export default {
    base: {
        mode: MODE_GAME,
    },
    keys: {
        keyState: allKoreanCharacters.map(character => ({
            character,
            lastSchedule: null,
            lastFactor: null,
            pressedDate: null,
        })),
        targetCharacter: frequencyOrdered[0],
        keypresses: [],
        disabledKeys: [],
        recentSuccesses: [],
    },
    // words
    words: {
        currentWord: frequencyOrderedWords[0],
        currentWordProgress: '',
        currentWordErrors: [],
        currentWordStartDateTime: null,
        history: [] // Shape: 
        // {
        //    word: "것",
        //    startDateTime:  new Date('2020-01-01T11:11:11'),
        //    endDateTime: new Date('2020-01-01T11:11:18'),
        //    errors: ['ㅑ', 'ㅏ'],
        //    numCharacters: 3,
        // } 
    }
};