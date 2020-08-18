import React from 'react'
import { useSelector } from 'react-redux'

export const SendButton = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.998 26.995">
      <path id="Icon_ionic-ios-send" data-name="Icon ionic-ios-send" d="M30.649,4.563,4.838,15.813a.592.592,0,0,0,.021,1.076l6.982,3.945a1.126,1.126,0,0,0,1.287-.127L26.895,8.838c.091-.077.309-.225.394-.141s-.049.3-.127.394L15.251,22.507a1.122,1.122,0,0,0-.113,1.343L19.7,31.17a.594.594,0,0,0,1.069-.014L31.444,5.344A.592.592,0,0,0,30.649,4.563Z" transform="translate(-4.503 -4.503)" fill={themeStyle.primary} />
    </svg>
  )
}
