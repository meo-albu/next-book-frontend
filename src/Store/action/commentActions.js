import axios from 'axios'
 
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
      type: "POST_COMMENTS",
      payload: response.data
    })
  }).catch(err => {
      console.log(err.response)
      // dispatch(setError(err.response.data.message[0].messages[0].message))
  })
}