import {
    createStore, combineReducers
} from "redux";
import keys from "../reducers/keys";
import base from '../reducers/base';
import words from '../reducers/words';
import initialState from './initialState';


export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
  
export function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
            if (!(key in target))
            Object.assign(output, { [key]: source[key] });
            else
            output[key] = mergeDeep(target[key], source[key]);
        } else {
            Object.assign(output, { [key]: source[key] });
        }
        });
    }
    return output;
}

const persistedState = localStorage.getItem('reduxState') ? mergeDeep(initialState, JSON.parse(localStorage.getItem('reduxState'))) : initialState;

persistedState.keys.keyState = persistedState.keys.keyState.map(k => {
    return k.pressedDate ? ({
        ...k,
        pressedDate: new Date(k.pressedDate)
    }) : k
});
persistedState.words.history = persistedState.words.history.map(h => ({
    ...h,
    startDateTime: new Date(h.startDateTime),
    endDateTime: new Date(h.endDateTime),
}))


const reducer = combineReducers({
    base,
    keys,
    words
})
const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;