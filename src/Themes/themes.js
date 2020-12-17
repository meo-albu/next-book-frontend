const isDarkTheme = localStorage.getItem('darkTheme') ? localStorage.getItem('darkTheme') === 'true' ? true : false : true

export const themeColors = {
  greenTheme: {
    primary: 'rgba(28, 165, 131, 1)',
    secondary: 'rgba(80, 210, 178, 1)'
  },
  purpleTheme: {
    primary: 'rgba(136, 0, 255, 1)',
    secondary: 'rgba(189, 123, 255, 1)'
  },
  blueTheme: {
    primary: 'rgba(43, 31, 216, 1)',
    secondary: 'rgba(135, 162, 252, 1)'
  },
  orangeTheme: {
    primary: 'rgba(252, 128, 3, 1)',
    secondary: 'rgba(255, 214, 119, 1)'
  },
  pinkTheme: {
    primary: 'rgba(255, 0, 136, 1)',
    secondary: 'rgba(254, 164, 233, 1)'
  }
}

Object.values(themeColors).map(theme => {
    theme.background = isDarkTheme ? 'rgba(72, 72, 72, 1)' : 'rgba(255, 253, 243, 1)'
    theme.textColor = isDarkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
    theme.gradient = `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`
    return true
})