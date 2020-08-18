import React from 'react'
import { useSelector } from 'react-redux'

export const UploadImage = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{width: '30px'}} viewBox="0 0 46.862 35.146">
      <path id="Icon_awesome-image" data-name="Icon awesome-image" d="M42.469,39.646H4.393A4.393,4.393,0,0,1,0,35.253V8.893A4.393,4.393,0,0,1,4.393,4.5H42.469a4.393,4.393,0,0,1,4.393,4.393v26.36A4.393,4.393,0,0,1,42.469,39.646ZM10.251,9.626a5.126,5.126,0,1,0,5.126,5.126A5.126,5.126,0,0,0,10.251,9.626ZM5.858,33.789H41V23.538l-8.01-8.01a1.1,1.1,0,0,0-1.553,0l-12.4,12.4L13.957,22.85a1.1,1.1,0,0,0-1.553,0L5.858,29.4Z" transform="translate(0 -4.5)" fill={themeStyle.secondary}/>
    </svg>
  )
}
