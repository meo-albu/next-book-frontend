import {themeColors} from '../../Themes/themes'

!localStorage.getItem('theme') && localStorage.setItem('theme', 'GREEN_THEME')
!localStorage.getItem('darkTheme') && localStorage.setItem('darkTheme', true)

const defaultState = {
  darkTheme: localStorage.getItem('darkTheme') === 'false' ? false : true,
  themeStyle: themeColors.greenTheme
}

localStorage.getItem('theme') === 'PURPLE_THEME' && (defaultState.themeStyle = themeColors.purpleTheme)
localStorage.getItem('theme') === 'BLUE_THEME' && (defaultState.themeStyle = themeColors.blueTheme)
localStorage.getItem('theme') === 'ORANGE_THEME' && (defaultState.themeStyle = themeColors.orangeTheme)
localStorage.getItem('theme') === 'PINK_THEME' && (defaultState.themeStyle = themeColors.pinkTheme)

const themeReducer = (state = defaultState, action) => {
  switch(action.type){
      case "GREEN_THEME":
        localStorage.setItem('theme', 'GREEN_THEME')
        return {
          ...state,
          themeStyle: {
            ...state.themeStyle,
            primary: themeColors.greenTheme.primary,
            secondary: themeColors.greenTheme.secondary,
            gradient: themeColors.greenTheme.gradient,
          }
        }
      case "PURPLE_THEME":
        localStorage.setItem('theme', 'PURPLE_THEME')
        return {
          ...state,
          themeStyle: {
            ...state.themeStyle,
            primary: themeColors.purpleTheme.primary,
            secondary: themeColors.purpleTheme.secondary,
            gradient: themeColors.purpleTheme.gradient,
          }
        }
      case "BLUE_THEME":
        localStorage.setItem('theme', 'BLUE_THEME')
        return {
          ...state,
          themeStyle: {
            ...state.themeStyle,
            primary: themeColors.blueTheme.primary,
            secondary: themeColors.blueTheme.secondary,
            gradient: themeColors.blueTheme.gradient,
          }
        }
      case "ORANGE_THEME":
        localStorage.setItem('theme', 'ORANGE_THEME')
        return {
          ...state,
          themeStyle: {
            ...state.themeStyle,
            primary: themeColors.orangeTheme.primary,
            secondary: themeColors.orangeTheme.secondary,
            gradient: themeColors.orangeTheme.gradient
          }
        }
      case "PINK_THEME":
        localStorage.setItem('theme', 'PINK_THEME')
        return {
          ...state,
          themeStyle: {
            ...state.themeStyle,
            primary: themeColors.pinkTheme.primary,
            secondary: themeColors.pinkTheme.secondary,
            gradient: themeColors.pinkTheme.gradient
          }
        }
      case "DARK_THEME":
        localStorage.setItem('darkTheme', true)
        return {
          darkTheme: true,
          themeStyle: {
            ...state.themeStyle,
            background: 'rgba(16, 16, 16, 1)',
            textColor: 'rgba(255, 255, 255, 1)'
          }
        }
      case "LIGHT_THEME":
        localStorage.setItem('darkTheme', false)
        return {
          darkTheme: false,
          themeStyle: {
            ...state.themeStyle,
            background: 'rgba(244, 249, 218, 1)',
            textColor: 'rgba(0, 0, 0, 1)'
          }
        }
      default: return state
  }
}

export default themeReducer