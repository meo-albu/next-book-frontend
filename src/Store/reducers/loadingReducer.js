const defaultState = {
  isLoading: false,
}

const loadingReducer = (state = defaultState, action) => {
  switch(action.type){
      case "LOADING":
        return {
          isLoading: true,
        }
      case "LOADED":
        return {
          isLoading: false
        }
      default: return state
  }
}

export default loadingReducer