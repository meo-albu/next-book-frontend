import axios from 'axios'
 
const getBookDetails = (payload) => ({ type: "GET_BOOK_DETAILS", payload})

export const closeModal = () => ({ type: "CLOSE_MODAL" })

export const getBook = (id) => dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`)
    .then(response => {
        const data = response.data
        dispatch(getBookDetails(data))
    }).catch(err => {
        console.log(err.response)
        // dispatch(setError(err.response.data.message[0].messages[0].message))
    })
}