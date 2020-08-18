import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const Bg = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const primary = themeStyle.primary
  const secondary = themeStyle.secondary

  return (
    <Container>
      <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="1142.503" height="1022.975" viewBox="0 0 1142.503 1022.975">
        <defs>
          <linearGradient id="linear-gradient" x1="0.201" y1="0.601" x2="1" y2="0.596" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={primary} />
            <stop offset="1" stopColor={secondary} />
          </linearGradient>
        </defs>
        <path id="Path_2" data-name="Path 2" d="M64.459,45.793C208.2-18.751,358.167-15.576,469.082-157.626,515.783-315.242,647.6-469.821,815.45-352.214c0,237.4,0,980.725,0,980.725s-856.189,1.946-1107.208,0c-114.828-78.468,79.781-212.1,167.346-284.1C-31.01,217.929-42.444,93.8,64.459,45.793Z" transform="translate(327.053 393.6)" fill="url(#linear-gradient)"/>
      </svg>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  @media only screen and (max-width: 1700px) {
    display: none;
  }
`