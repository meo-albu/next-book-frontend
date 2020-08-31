const defaultState = {
  isOpen: false,
  message: ''
}

const toastReducer = (state = defaultState, action) => {
  switch(action.type){
      case "OPEN_TOAST":
        return {
          isOpen: true,
          message: action.payload
        }
      case "CLOSE_TOAST":
        return {
          isOpen: false,
          message: ''
        }
      default: return state
  }
}

export default toastReducer

