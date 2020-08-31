const defaultState = {
  isOpen: false,
  likedBooks: []
}

const wishlistReducer = (state = defaultState, action) => {
  switch(action.type){
      case "SET_WISHLIST":
        return {
            ...state,
            likedBooks: action.payload
        }
      case "ADD_TO_WISHLIST":
        return {
            ...state,
            likedBooks: [...state.likedBooks, action.payload]
        }
      case "DELETE_FROM_WISHLIST":
        return {
            ...state,
            likedBooks: state.likedBooks.filter(like => like.id !== action.payload.id)
        }
      case "OPEN_WISHLIST":
        return {
            ...state,
            isOpen: true
        }
      case "CLOSE_WISHLIST":
        return {
            ...state,
            isOpen: false
        }
      default: return state
  }
}

export default wishlistReducer