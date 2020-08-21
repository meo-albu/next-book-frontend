export const addGenre = (genre) => dispatch => {
  dispatch({
    type: "ADD_GENRE",
    payload: genre
  })
}