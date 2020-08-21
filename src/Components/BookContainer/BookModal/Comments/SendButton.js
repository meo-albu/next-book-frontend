import React from 'react'
import { useSelector } from 'react-redux'

export const SendButton = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="20.823" height="20.82" viewBox="0 0 20.823 20.82">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor={themeStyle.secondary}/>
          <stop offset="1" stopColor={themeStyle.primary}/>
        </linearGradient>
      </defs>
      <path id="Icon_ionic-ios-send" data-name="Icon ionic-ios-send" d="M24.669,4.549,4.761,13.226a.456.456,0,0,0,.016.83L10.162,17.1a.868.868,0,0,0,.992-.1L21.773,7.847c.07-.06.239-.174.3-.108s-.038.233-.1.3L12.792,18.389a.865.865,0,0,0-.087,1.036l3.52,5.645a.458.458,0,0,0,.824-.011L25.282,5.151A.456.456,0,0,0,24.669,4.549Z" transform="translate(-4.503 -4.503)" fill="url(#linear-gradient)"/>
    </svg>
  )
}
