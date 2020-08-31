import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const UserDetails = () => {
  const theme = useSelector(state => state.themeReducer.themeStyle)
  const user = useSelector(state => state.userReducer.user)

  return (
    <Container>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 35.667 23.177">
          <defs>
            <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor={theme.secondary}/>
              <stop offset="1" stopColor={theme.primary}/>
            </linearGradient>
          </defs>
          <path id="Icon_zocial-email" data-name="Icon zocial-email" d="M.072,25.192V6.121q0-.033.1-.629l11.66,9.6L.21,25.854a2.713,2.713,0,0,1-.138-.662ZM1.62,4.167a1.533,1.533,0,0,1,.585-.1h31.4a2.016,2.016,0,0,1,.619.1L22.531,13.8l-1.548,1.192-3.061,2.417-3.061-2.417L13.314,13.8Zm.034,22.978L13.383,16.319l4.54,3.543,4.54-3.543L34.191,27.145a1.709,1.709,0,0,1-.585.1H2.2a1.611,1.611,0,0,1-.55-.1ZM24.01,15.094l11.625-9.6a1.909,1.909,0,0,1,.1.629V25.192a2.45,2.45,0,0,1-.1.662Z" transform="translate(-0.072 -4.068)" fill="url(#linear-gradient)"/>
        </svg>

        {user.username}
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 36 36">
          <defs>
            <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor={theme.secondary}/>
              <stop offset="1" stopColor={theme.primary}/>
            </linearGradient>
          </defs>
          <path id="Icon_awesome-user-alt" data-name="Icon awesome-user-alt" d="M18,20.25A10.125,10.125,0,1,0,7.875,10.125,10.128,10.128,0,0,0,18,20.25Zm9,2.25H23.126a12.24,12.24,0,0,1-10.252,0H9a9,9,0,0,0-9,9v1.125A3.376,3.376,0,0,0,3.375,36h29.25A3.376,3.376,0,0,0,36,32.625V31.5A9,9,0,0,0,27,22.5Z" fill="url(#linear-gradient)"/>
        </svg>

        {user.email}
      </p>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 0 25px;
  
  p {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 13px;

    svg {
      margin-right: 10px;
    }
  }
`
