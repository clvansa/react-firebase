import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, SET_SCREAM, SET_ERRORS, LOADING_UI, POST_SCREAM, CLEAR_ERRORS, STOP_LOADING_UI,SET_UPDATE,SET_UPDATE2,SUBMIT_COMMENT,DELETE_COMMENT} from '../types'
import axios from 'axios';



//Get all screams
export const getScreams = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get('/screams')
        .then(res => {
            dispatch({type: SET_SCREAMS,
                      payload: res.data})
        })
        .catch(err => {
            dispatch({type: SET_SCREAMS,
                        payload: []})
        })
}


// Post scream 

export const postScreamText = (newScream) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/scream', newScream)
        .then((res)=> {
            dispatch({type : POST_SCREAM,
                payload: res.data})
                dispatch(clearErrors())
            })
        .catch(err => {
            dispatch({type: SET_ERRORS,
                     payload:err.response.data})
        })
}

export const postScream = (newScream,formData) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/scream', newScream)
        .then((res)=> {
            dispatch({type : POST_SCREAM,
                payload: res.data})
                dispatch({type: SET_UPDATE,
                        payload:res.data})
                dispatch(clearErrors())
                 axios.post(`/scream/${res.data.screamId}/image`,formData)
                    .then(res => {
                        dispatch({type: SET_UPDATE2,
                            payload: res.data})
                    })
  
            })

        .catch(err => {
            dispatch({type: SET_ERRORS,
                     payload:err.response.data})
        })
}



//Like a scream
export const likeScream = (scremaId) => (dispatch) => {
    axios.post(`/scream/${scremaId}/like`)
        .then(res => {
            dispatch({type: LIKE_SCREAM,
                    payload: res.data})
        })
        .catch(err => console.log(err))
}
//Unlike a scream
export const unlikeScream = (scremaId) => (dispatch) => {
    axios.post(`/scream/${scremaId}/unlike`)
        .then(res => {
            dispatch({type: UNLIKE_SCREAM,
                    payload: res.data})
        })
        .catch(err => console.log(err))
}

//Submit commit 
export const submitComment = (screamId,commentData) => (dispatch)=> {
    axios.post(`/scream/${screamId}/comment`,commentData)
        .then(res => {
            dispatch({type: SUBMIT_COMMENT,
            payload:res.data})
            console.log(res.data)
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({type: SET_ERRORS,
            payload: err.response.data})
        })
}


//Delete Comment
export const deleteComment = (commentId) => (dispatch) => {
    axios.delete(`/comment/${commentId}`)
        .then(() => {
            dispatch({type: DELETE_COMMENT,
                        payload: commentId})
                        
            })

        .catch(err => console.log(err))
}

// Delete scream
export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({type: DELETE_SCREAM,
                        payload: screamId})
        })
        .catch(err => console.log(err))
}


//Get  scream
export const getScream = (screamId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.get(`/scream/${screamId}`)
        .then(res => {
            dispatch({type: SET_SCREAM,
                      payload: res.data})
            dispatch({type: STOP_LOADING_UI})
        })

        .catch(err => console.log(err))
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}


//get userdata 

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
        .then((res) => {
            dispatch({type: SET_SCREAMS,
                    payload: res.data.screams})
        }).catch(() => {
            dispatch({type: SET_SCREAMS,
                    payload: null})
        })
}

