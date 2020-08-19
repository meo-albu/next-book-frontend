const defaultState = {
  comments: []
}

const commentsReducer = (state = defaultState, action) => {
  switch(action.type){
      case "GET_COMMENTS":
        return {
          comments: action.payload
        }
      case "POST_COMMENTS":
        return {
          comments: [
            ...state.comments,
            action.payload
          ]
        }
      default: return state
  }
}

export default commentsReducer