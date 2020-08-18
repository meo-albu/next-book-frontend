const defaultState = {
  books: []
}

const bookReducer = (state = defaultState, action) => {
  switch(action.type){
      case "GET_BOOKS":
        return {
          books: action.payload
        }
      case "ADD_BOOK":
        return {
          ...state,
          books: [action.payload, ...state.books]
        }
      case "DELETE_BOOK":
        return {
          ...state,
          books: state.books.filter(book => book.id !== action.payload)
        }
      default: return state
  }
}

export default bookReducer