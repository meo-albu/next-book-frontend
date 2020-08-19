import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const PhoneBg = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const primary = themeStyle.primary
  const secondary = themeStyle.secondary

  return (
        <Phone xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="454.329" height="414.341" viewBox="0 0 454.329 414.341">
          <defs>
            <linearGradient id="linear-gradient" x1="0.976" y1="0.483" x2="-0.395" y2="0.39" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={primary}/>
                    <stop offset="1" stopColor={secondary}/>
            </linearGradient>
            <filter id="Path_165" x="0" y="0" width="454.329" height="414.341" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feFlood floodOpacity="0.9"/>
              <feComposite operator="in" in2="blur"/>
              <feComposite in="SourceGraphic"/>
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_165)">
            <path id="Path_165-2" data-name="Path 165" d="M556.025-422.263l-5.447,373.4L131.7-47.58V-394.744s108.112-60.042,210.266-27.519S556.025-422.263,556.025-422.263Z" transform="translate(571.03 -32.58) rotate(180)" fill="url(#linear-gradient)"/>
          </g>
        </Phone>
      )
    }

const Phone = styled.svg`
  display: none;
  z-index: -1;

  @media only screen and (max-width: 425px) {
    display: block;
    position: fixed;
    top: -70px;
    width: 110%;
    left: -20px;
  }
`