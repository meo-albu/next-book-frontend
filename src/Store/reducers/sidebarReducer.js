const defaultState = {
  opened: false
}

const sidebarReducer = (state = defaultState, action) => {
  switch(action.type){
      case "OPEN_SIDEBAR":
        return {
            opened: true
        }
      case "CLOSE_SIDEBAR":
        return {
            opened: false
        }
      default: return state
  }
}

export default sidebarReducer