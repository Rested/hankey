import { CHANGE_MODE, MUTE } from '../actions/hankey';
import initialState from '../stores/initialState';

function base(state = initialState, action){
    switch(action.type){
        case CHANGE_MODE:
            return {
                ...state,
                mode: action.mode,
            }
        case MUTE:
            return {
                ...state,
                muted: !state.muted,
            }
        default:
            return state;
    }
}

export default base;