import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, SET_CHAT, STOP_LOADING_UI} from '../types';
import axios from 'axios';

// Login
export const loginUser = (userData, history) => (dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/login',userData)
    .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS})
        history.push('/')
    })
    .catch(err => {
       dispatch({
           type : SET_ERRORS,
           payload : err.response.data
       })
    });
}

//Signup

export const signupUser = (newUserData, history) => (dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/signup',newUserData)
    .then(res => {
        setAuthorizationHeader(res.data.tokenId)
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS})
        history.push('/')
    })
    .catch(err => {
       dispatch({
           type : SET_ERRORS,
           payload : err.response.data
       })
    });
}

//Logout
export const logoutUser =  () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
    window.location.href = '/login';
   
}

// Get user data
export const getUserData = () => (dispatch) =>{
    dispatch({type: LOADING_USER});
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// Set Authorization 
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken',FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;

}

// Upload Profile Image
export const uploadImage = (formData) => (dispatch) => {
    dispatch({type : LOADING_USER});
    axios.post('/user/image', formData)
        .then(() =>{
            dispatch(getUserData())
        })
        .catch(err => {
            console.log(err)
        })

}


// Edit user details

export const editUserDetails = (userDetails) => (dispatch) =>{
    dispatch({type: LOADING_USER});
    axios.post('/user',userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

export const sendMessage = (userHandle,message) => (dispatch) => {
    axios.post(`/users/${userHandle}/chat`,message)
        .then(()=> {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}


export const getChatUser = () => (dispatch) => {
    dispatch({type:LOADING_UI})
    axios.get('/users/chat')
        .then((res) =>{
            dispatch({type:SET_CHAT,
            payload:res.data})
            dispatch({type:STOP_LOADING_UI})
         

        })
}

