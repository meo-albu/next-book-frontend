const defaultState = {
  bookContainer: false
}

const bookContinerReducer = (state = defaultState, action) => {
  switch(action.type){
      case "SHOW_BOOKCONTAINER":
        return {
          bookContainer: true
        }
      case "HIDE_BOOKCONTAINER":
        return {
          bookContainer: false
        }
      default: return state
  }
}

export default bookContinerReducer