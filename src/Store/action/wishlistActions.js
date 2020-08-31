
export const openWishlist = () => ({type: 'OPEN_WISHLIST'})
export const closeWishlist = () => ({type: 'CLOSE_WISHLIST'})

export const setWishlist = (wishlist) => (dispatch) => {
  dispatch({
    type: 'SET_WISHLIST',
    payload: wishlist
  })
}

export const addToWishlist = (wishlist) => (dispatch) => {
  dispatch({
    type: 'ADD_TO_WISHLIST',
    payload: wishlist
  })
}

export const deleteFromWishlist = (id) => (dispatch) => {
  dispatch({
    type: 'DELETE_FROM_WISHLIST',
    payload: {id}
  })
}