const defaultState = {
  genres: []
}

const genreReducer = (state = defaultState, action) => {
  switch(action.type){
      case "ADD_GENRE":
        return {
          genres: [
            ...state.genres,
            action.payload
          ]
        }
      default: return state
  }
}

export default genreReducer