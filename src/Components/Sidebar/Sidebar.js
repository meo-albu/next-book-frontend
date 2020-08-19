import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import hammer from 'hammerjs'
import { ChangeTheme } from '../ChangeTheme'
import { useSelector, useDispatch } from 'react-redux'
import { openSidebar, closeSidebar } from '../../Store/action/sidebarActions'
import { CloseSidebarButton } from './CloseSidebarButton'
import { DarkTheme } from './DarkTheme'
import { logUserOut } from '../../Store/action/userActions'
import { closeLoginModal, openRegisterModal, closeRegisterModal, openLoginModal } from '../../Store/action/authModalActions'

export const Sidebar = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const sidebar = useSelector(state => state.sidebarReducer.opened)
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const dispatch = useDispatch()

  const sidebarRef = useRef(null)
  const closeSidebarRef = useRef(null)

  const sidebarAction = (el, direction, action) => {
    const hm = new hammer.Manager(el)
    const Swipe = new hammer.Swipe()
    hm.add(Swipe)
    hm.on(direction, () => {
      dispatch(action())
    })
  }

  useEffect(() => {
    const screenWidth = window.screen.availWidth
    if(screenWidth < 700) {
      sidebarAction(closeSidebarRef.current, 'swipeleft', openSidebar)
      sidebarAction(sidebarRef.current, 'swiperight', closeSidebar)
    }
  })
  
  return (
    <Container sidebar={sidebar} ref={sidebarRef} theme={themeStyle}>
      <CloseSidebarButton />
      {!loggedIn && 
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
        }}>
          <Login onClick={() => {
            dispatch(closeRegisterModal())
            dispatch(openLoginModal())
            dispatch(closeSidebar())
          }}>Login</Login>
          <Register onClick={() => {
            dispatch(closeLoginModal())
            dispatch(openRegisterModal())
            dispatch(closeSidebar())
            }}>Register</Register>
        </div>}
      <h3>Change theme:</h3>
      <ChangeTheme />
      <DarkTheme />
      {loggedIn &&
        <Logout onClick={() => {
          dispatch(logUserOut())
          dispatch(closeSidebar())
        }}>Logout</Logout> }
      <Swipper ref={closeSidebarRef} />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0vh;
  bottom: 0vh;
  right: 0;
  width: 360px;
  z-index: 1000;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.textColor};
  padding: 30px;
  transform: ${({sidebar}) => sidebar ? 'translateX(0)' : 'translateX(100%)'};
  transform-origin: right;
  transition: transform 0.2s;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;

  @media only screen and (max-width: 600px) {
    padding: 15px;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${({theme}) => theme.secondary};

    @media only screen and (max-width: 600px) {
      display: none;
    }
  }

  &:after {
    content: '';
    position: absolute;
    right: 100%;
    top: 0;
    bottom: 0;
    z-index: -1;
    transition: opacity 0.5s;
    opacity: ${({sidebar}) => sidebar ? '1' : '0'};
    pointer-events: ${({sidebar}) => sidebar ? 'all' : 'none'};
    width: calc(100vw + 360px);
    background: rgba(0, 0, 0, 0.6);
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`


const Swipper = styled.div`
  position: absolute;
  top: 0vh;
  bottom: 0vh;
  left: -15px;
  width: 15px;
`

const Logout = styled.button`
  background: ${({theme}) => theme.primary};
  display: block;
  text-align: center;
  padding: 10px;
  border: 0;
  margin: 15px 0;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
`

const Login = styled.span`
  cursor: pointer;
  color: ${({theme}) => theme.textColor};
  display: none;

  @media only screen and (max-width: 600px) {
   display: inline-block;
  }
`

const Register = styled.button`
  margin: 0 0 0 15px;
  cursor: pointer;
  background: ${({theme}) => theme.primary};
  color: white;
  border: 0;
  padding: 7px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: none;

  @media only screen and (max-width: 600px) {
   display: inline-block;
  }
`