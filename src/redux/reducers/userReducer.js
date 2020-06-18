import {SET_USER,  SET_AUTHENTICATED, SET_UNAUTHENTICATED,LOADING_USER,LIKE_SCREAM, UNLIKE_SCREAM} from '../types';
import { act } from 'react-dom/test-utils';

const initialState = {
    authenticated: false,
    loading:false,
    credentials: {},
    likes: [],
    notifications: []
    
};

export default function (state = initialState,action) {
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated:true
            };
        case SET_UNAUTHENTICATED:
            return state;
        case SET_USER:
            return {
                authenticated:true,
                loading:false,
                ...action.payload
                
            };
        case LOADING_USER:
            return {
                ...state,
                loading:true
            }
        case LIKE_SCREAM:
            return{
                ...state,
                likes:[
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId : action.payload.screamId
                        
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return{
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId )
            }
        
        default:
            return state
    }
}