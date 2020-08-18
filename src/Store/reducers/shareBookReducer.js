const defaultState = {
  isOpen: false,
}

const shareBookReducer = (state = defaultState, action) => {
  switch(action.type){
      case "OPEN_SHARE":
        return {
          isOpen: true,
        }
      case "CLOSE_SHARE":
        return {
          isOpen: false
        }
      default: return state
  }
}

export default shareBookReducer