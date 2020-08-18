import axios from 'axios'
import { closeLoginModal, closeRegisterModal } from './authModalActions'
import { openLoader, closeLoader } from './loadingActions'

const setUser = (payload) => ({ type: "SET_USER", payload})
export const setError = (payload) => {
    return { type: "SET_ERROR", payload}
}
export const authError = () => ({type: "AUTH_ERROR"})
export const clearError = () => ({type: "CLEAR_ERROR"})

export const logUserOut = () => ({type: "LOG_OUT"})

export const logUserIn = (userInfo) => dispatch => {
    dispatch(openLoader())
    axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, userInfo)
    .then(response => {
        const data = response.data
        localStorage.setItem("token", data.jwt)
        dispatch(setUser(data.user))
        dispatch(clearError())
        dispatch(closeLoader())
    }).then(() => {
        dispatch(closeLoginModal())
    })
    .catch(err => {
        dispatch(closeLoader())
        dispatch(setError(err.response.data.message[0].messages[0].message))
        dispatch(authError())
    })
}

export const signUserUp = (userInfo) => dispatch => {
    dispatch(openLoader())
    axios.post(`${process.env.REACT_APP_API_URL}/auth/local/register`, userInfo)
    .then(response => {
        const data = response.data
        localStorage.setItem("token", data.jwt)
        dispatch(setUser(data.user))
        dispatch(clearError())
        dispatch(closeLoader())
    }).then(() => {
        dispatch(closeRegisterModal())
    }).catch(err => {
        dispatch(closeLoader())
        dispatch(setError(err.response.data))
        dispatch(authError())
    })
}

export const autoLogin = () => dispatch => {
    dispatch(openLoader())
    localStorage.getItem('token') ?
        axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            const data = response.data
            dispatch(setUser(data))
            dispatch(clearError())
            dispatch(closeLoader())
        }).catch(err => {
            // dispatch(setError(err.response.data.message[0].messages[0].message))
            // dispatch(authError())
            dispatch(closeLoader())
        })
    : dispatch(closeLoader())
}