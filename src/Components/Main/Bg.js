import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const Bg = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const primary = themeStyle.primary
  const secondary = themeStyle.secondary

  return (
      <Container xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="1141.647" height="1124.321" viewBox="0 0 1141.647 1124.321">
        <defs>
          <linearGradient id="linear-gradient" x1="1.115" y1="0.743" x2="0" y2="0.626" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={primary}/>
            <stop offset="1" stopColor={secondary}/>
          </linearGradient>
          <filter id="Path_164" x="0" y="0" width="1141.647" height="1124.321" filterUnits="userSpaceOnUse">
            <feOffset input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="21" result="blur"/>
            <feFlood floodOpacity="0.271"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
          </filter>
        </defs>
        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_164)">
          <path id="Path_164-2" data-name="Path 164" d="M723.889-559.135c0,193.711,0,997.361,0,997.361H-291.758S45.223,445.707-129.916,255.74C-206.8,172.345-172.36-75,109.823-140.905,267-177.612,335.639-504.172,535.815-423.354S696.108-576.45,723.889-559.135Z" transform="translate(420.76 623.05)" fill="url(#linear-gradient)"/>
        </g>
      </Container>
  )
}

const Container = styled.svg`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  @media only screen and (max-width: 1000px) {
    opacity: 0;
    visibility: hidden;
  }
  @media only screen and (max-width: 1600px) {
    right: -50px;
  }
`