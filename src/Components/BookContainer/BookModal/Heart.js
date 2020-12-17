import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const Heart = (props) => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)

  return (
      <Container width="20" height="20" viewBox="0 0 27.003 26.119">
        <defs>
          <linearGradient id="linear-gradient-heart" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={themeStyle.primary}/>
            <stop offset="1" stopColor={themeStyle.secondary}/>
          </linearGradient>
        </defs>
        <path id="Icon_ionic-ios-heart" data-name="Icon ionic-ios-heart" d="M22.377,3.938h-.063a7.112,7.112,0,0,0-5.938,3.25,7.112,7.112,0,0,0-5.938-3.25h-.063a7.067,7.067,0,0,0-7,7.063A15.215,15.215,0,0,0,6.363,19.3,52.36,52.36,0,0,0,16.376,28.94,52.36,52.36,0,0,0,26.39,19.3,15.215,15.215,0,0,0,29.378,11,7.067,7.067,0,0,0,22.377,3.938Z" transform="translate(-2.875 -3.438)" stroke={props.liked ? 'transparent' : themeStyle.primary} strokeWidth="2" fill={props.liked ? 'url(#linear-gradient-heart)' : 'transparent'}/>
      </Container>
  )
}

const Container = styled.svg`
  transition: transform 0.3s;
  transform-origin: center;
  cursor: pointer;

  :hover {
    transform: scale(1.2)
  }
`