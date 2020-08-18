const defaultState = {
  loggedIn: false,
  authError: false,
  user: {}
}

const userReducer = (state = defaultState, action) => {
  switch(action.type){
      case "SET_USER":
        return {
            loggedIn: true,
            authError: false,
            user: {...action.payload}
        }
      case "LOG_OUT":
        localStorage.removeItem('token')
        return {
            loggedIn: false,
            authError: false,
            user: {}
        }
      case "AUTH_ERROR":
        localStorage.removeItem('token')
        return {
            loggedIn: false,
            authError: true,
            user: {}
        }
      default: return state
  }
}

export default userReducer