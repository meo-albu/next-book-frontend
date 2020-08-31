import axios from 'axios'
 
const setBooks = (payload) => ({ type: "GET_BOOKS", payload})

export const openEditBookModal = (id) => dispatch => {
    dispatch({
      type: "OPEN_EDIT_BOOK_MODAL",
      payload: id
    })
  }
  
  export const closeEditBookModal = () => dispatch => {
    dispatch({
      type: "CLOSE_EDIT_BOOK_MODAL"
    })
  }
  
  export const openDeleteBookModal = (id) => dispatch => {
    dispatch({
      type: "OPEN_DELETE_BOOK_MODAL",
      payload: id
    })
  }

  export const getBook = (id) => dispatch => {
    dispatch({
      type: "GET_BOOK",
      payload: id
    })
  }
  
  export const closeDeleteBookModal = () => dispatch => {
    dispatch({
      type: "CLOSE_DELETE_BOOK_MODAL"
    })
  }

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

export const deleteBook = (id) => dispatch => {
    axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`, {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(() => {
        dispatch({
            type: "DELETE_BOOK",
            payload: id
        })
    }).catch(err => {
        console.log(err.response)
    })
}

export const editBook = (id, description) => dispatch => {
    axios.put(`${process.env.REACT_APP_API_URL}/books/${id}`, {description}, {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(() => {
        dispatch({
            type: "EDIT_BOOK",
            payload: {id, description}
        })
    }).catch(err => {
        console.log(err.response)
    })
}