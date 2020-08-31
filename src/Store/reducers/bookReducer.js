const defaultState = {
  books: [],
  editIsOpen: false,
  deleteIsOpen: false,
  book: null
}

const bookReducer = (state = defaultState, action) => {
  switch(action.type){
      case "GET_BOOKS":
        return {
          ...state,
          books: action.payload
        }
      case "GET_BOOK":
        return {
          ...state,
          book: state.books.find(book => book.id === action.payload && book)
        }
      case "OPEN_EDIT_BOOK_MODAL":
        return {
          ...state,
          editIsOpen: true
        }
      case "CLOSE_EDIT_BOOK_MODAL":
        return {
          ...state,
          editIsOpen: false
        }
      case "OPEN_DELETE_BOOK_MODAL":
        return {
          ...state,
          deleteIsOpen: true
        }
      case "CLOSE_DELETE_BOOK_MODAL":
        return {
          ...state,
          deleteIsOpen: false
        }
      case "EDIT_BOOK":
        return {
          ...state,
          books: state.books.map(book => book.id === action.payload.id ? {...book, description: action.payload.description} : book),
          book: {...state.book, description: action.payload.description},
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