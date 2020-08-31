const defaultState = {
  comments: [],
  editIsOpen: false,
  deleteIsOpen: false,
  commentToEdit: null,
  commentToDelete: null
}

const commentsReducer = (state = defaultState, action) => {
  switch(action.type){
      case "GET_COMMENTS":
        return {
          ...state,
          comments: action.payload
        }
      case "POST_COMMENT":
        return {
          ...state,
          comments: [
            ...state.comments,
            action.payload
          ]
        }
      case "DELETE_COMMENT":
        return {
          ...state,
          comments: state.comments.filter(comment => comment.id !== action.id)
        }
      case "OPEN_EDIT_COMMENT_MODAL":
        return {
          ...state,
          commentToEdit: state.comments.find(comment => comment.id === action.payload),
          editIsOpen: true
        }
      case "CLOSE_EDIT_COMMENT_MODAL":
        return {
          ...state,
          commentToEdit: null,
          editIsOpen: false
        }
      case "OPEN_DELETE_COMMENT_MODAL":
        return {
          ...state,
          commentToDelete: state.comments.find(comment => comment.id === action.payload),
          deleteIsOpen: true
        }
      case "CLOSE_DELETE_COMMENT_MODAL":
        return {
          ...state,
          commentToDelete: null,
          deleteIsOpen: false
        }
      case "DELETE_ALL_BOOK_COMMENTS":
        return {
          ...state,
          comments: state.comments.filter(comment => comment.book.id !== action.payload.bookId)
        }
      case "EDIT_COMMENT":
        return {
          ...state,
          comments: state.comments.map(comm => comm.id === action.payload.id ? {...comm, comment: action.payload.comment} : comm)
        }
      default: return state
  }
}

export default commentsReducer