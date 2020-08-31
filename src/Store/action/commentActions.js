import axios from 'axios'

export const openEditCommentModal = (id) => dispatch => {
  dispatch({
    type: "OPEN_EDIT_COMMENT_MODAL",
    payload: id
  })
}

export const closeEditCommentModal = () => dispatch => {
  dispatch({
    type: "CLOSE_EDIT_COMMENT_MODAL"
  })
}

export const openDeleteCommentModal = (id) => dispatch => {
  dispatch({
    type: "OPEN_DELETE_COMMENT_MODAL",
    payload: id
  })
}

export const closeDeleteCommentModal = () => dispatch => {
  dispatch({
    type: "CLOSE_DELETE_COMMENT_MODAL"
  })
}
 
export const getComments = () => dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/comments`)
    .then(response => {
        dispatch({
          type: "GET_COMMENTS", 
          payload: response.data
        })
    }).catch(err => {
        console.log(err.response)
        // dispatch(setError(err.response.data.message[0].messages[0].message))
    })
}

export const postComment = (comm) => dispatch => {
  axios.post(`${process.env.REACT_APP_API_URL}/comments`, comm, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }).then(response => {
    dispatch({
      type: "POST_COMMENT",
      payload: response.data
    })
  }).catch(err => {
      console.log(err.response)
      // dispatch(setError(err.response.data.message[0].messages[0].message))
  })
}

export const deleteComment = (id) => dispatch => {
  axios.delete(`${process.env.REACT_APP_API_URL}/comments/${id}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }).then(() => {
      dispatch({
        type: "DELETE_COMMENT",
        id: id
      })
  }).catch(err => {
      console.log(err.response)
      // dispatch(setError(err.response.data.message[0].messages[0].message))
  })
}

export const deleteAllBookComments = (commentId, bookId) => dispatch => {
  axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }).then(() => {
      dispatch({
        type: "DELETE_ALL_BOOK_COMMENTS",
        payload: {
          commentId,
          bookId
        }
      })
  }).catch(err => {
      console.log(err.response)
      // dispatch(setError(err.response.data.message[0].messages[0].message))
  })
}

export const editComment = (id, comment) => dispatch => {
  axios.put(`${process.env.REACT_APP_API_URL}/comments/${id}`, {comment}, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }).then(response => {
      dispatch({
        type: "EDIT_COMMENT",
        payload: {
          id, comment
        }
      })
  }).catch(err => {
      console.log(err.response)
      // dispatch(setError(err.response.data.message[0].messages[0].message))
  })
}