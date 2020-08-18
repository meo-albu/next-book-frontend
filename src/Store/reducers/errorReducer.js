const defaultState = {
  error: null
}

const errorReducer = (state = defaultState, action) => {
  switch(action.type){
      case "SET_ERROR":
        return {
            error: action.payload
        }
      case "CLEAR_ERROR":
        return {
            error: null
        }
      default: return state
  }
}

export default errorReducer