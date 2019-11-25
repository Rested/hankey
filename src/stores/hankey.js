import { createStore } from "redux";
import hankeyApp from "../reducers/hankey";
import frequencyOrdered from '../core/frequencies';
import {allKoreanCharacters} from '../core/keys';
import { MODE_GAME } from "../constants";

const initialState = {
    keyState: allKoreanCharacters.map(character => ({
        character,
        lastSchedule: null,
        lastFactor: null,
        pressedDate: null,
    })),
    targetCharacter: frequencyOrdered[0],
    keypresses: [],
    disabledKeys: [],
    ignoreInputs: false,
    mode: MODE_GAME,
};

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : initialState
const store = createStore(hankeyApp, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;