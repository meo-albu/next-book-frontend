import axios from 'axios'
 
const setBooks = (payload) => ({ type: "GET_BOOKS", payload})

export const getBooks = () => dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`)
    .then(response => {
        const data = response.data
        dispatch(setBooks(data.sort(function(a, b) {
            return Date.parse(b.created_at) - Date.parse(a.created_at);
          })))
    }).catch(err => {
        console.log(err.response)
    })
}