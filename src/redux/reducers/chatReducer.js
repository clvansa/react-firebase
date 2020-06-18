import {SET_CHAT} from '../types';
import { act } from 'react-dom/test-utils';

const initialState = {
    messages : []
}

export default function(state = initialState, action)  {
    switch(action.type){
        case SET_CHAT:
            return {
                ...action.payload
            }
        default:
            return state

    }

} 