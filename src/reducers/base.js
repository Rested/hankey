import { CHANGE_MODE } from '../actions/hankey';
import initialState from '../stores/initialState';

function base(state = initialState, action){
    switch(action.type){
        case CHANGE_MODE:
            return {
                ...state,
                mode: action.mode,
            }
        default:
            return state;
    }
}

export default base;