const defaultState = {
  isOpen: false,
}

export const loginModalReducer = (state = defaultState, action) => {
  switch(action.type){
      case "OPEN_LOGIN":
        return {
          isOpen: true,
        }
      case "CLOSE_LOGIN":
        return {
          isOpen: false
        }
      default: return state
  }
}

export const registerModalReducer = (state = defaultState, action) => {
  switch(action.type){
      case "OPEN_REGISTER":
        return {
          isOpen: true,
        }
      case "CLOSE_REGISTER":
        return {
          isOpen: false
        }
      default: return state
  }
}