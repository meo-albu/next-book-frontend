const defaultState = {
  isOpen: false,
  bookDetails: null
}

const modalReducer = (state = defaultState, action) => {
  switch(action.type){
      case "GET_BOOK_DETAILS":
        return {
          isOpen: true,
          bookDetails: action.payload
        }
      case "CLOSE_MODAL":
        return {
          bookDetails: null,
          isOpen: false
        }
      default: return state
  }
}

export default modalReducer