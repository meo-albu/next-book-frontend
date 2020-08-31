import axios from 'axios'
import { closeLoginModal, closeRegisterModal } from './authModalActions'
import { openLoader, closeLoader } from './loadingActions'
import { setWishlist } from './wishlistActions'
import { openToast, closeToast } from './toastActions'

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
        dispatch(setError(err.response.data.message[0].messages[0].message))
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
            dispatch(closeLoader())
            const data = response.data
            const wishlist = []
            data.likes.forEach(like => {
                axios.get(`${process.env.REACT_APP_API_URL}/books/${like.book}`)
                    .then(res => wishlist.push(res.data))
            })
            dispatch(setWishlist(wishlist))
            dispatch(setUser(data))
            dispatch(clearError())
        }).catch(err => {
            // dispatch(setError(err.response.data.message[0].messages[0].message))
            // dispatch(authError())
            dispatch(closeLoader())
        })
    : dispatch(closeLoader())
}

export const updateUser = (id, username, email) => dispatch => {
    dispatch(openLoader())
    localStorage.getItem('token') ?
        axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`,
        {username, email},
        {
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
            console.log(err.response)
            // dispatch(setError(err.response.data.message[0].messages[0].message))
            // dispatch(authError())
            dispatch(closeLoader())
        })
    : dispatch(closeLoader())
}

export const updatePassword = (email) => dispatch => {
    dispatch(openLoader())
    axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`,
    {email})
    .then(response => {
        dispatch(openToast(`An email was sent to ${email}`))
        dispatch(closeLoader())
        dispatch(clearError())
        setTimeout(() => {
            dispatch(closeToast())
        }, 4000);
    }).catch(err => {
        dispatch(closeLoader())
        console.log(err.response)
    })
}

export const resetPassword = (code, password, passwordConfirmation) => dispatch => {
    dispatch(openLoader())
    axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`,
    {code, password, passwordConfirmation})
    .then(response => {
        dispatch(closeLoader())
        dispatch(openToast(`Your password has been changed successfully!`))
        dispatch(clearError())
        setTimeout(() => {
            dispatch(closeToast())
        }, 4000);
    }).catch(err => {
        dispatch(closeLoader())
        dispatch(setError(err.response.data.message[0].messages[0].message + " Make sure you didn't used the same email twice!"))
        console.log(err.response)
    })
}