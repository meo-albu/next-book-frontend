import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { openLoginModal, openRegisterModal, closeLoginModal, closeRegisterModal } from '../../Store/action/authModalActions'
import { openSidebar } from '../../Store/action/sidebarActions'

export const Header = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const bookC = useSelector(state => state.bookContainerReducer.bookContainer)
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const dispatch = useDispatch()

  return (
    <Containter theme={themeStyle} darkTheme={darkTheme} bookC={bookC} loggedIn={loggedIn}>

    {!bookC &&
      !loggedIn && 
        <div>
          <Register onClick={() => {
              dispatch(closeLoginModal())
              dispatch(openRegisterModal())
            }}>Register</Register>
          <Login onClick={() => {
            dispatch(closeRegisterModal())
            dispatch(openLoginModal())
          }}>Login</Login>
        </div>
      }

      <Burger onClick={() => dispatch(openSidebar())}><span></span></Burger>
      <Logo bookC={bookC}>NextBook</Logo>
    </Containter>
  )
}

const Logo = styled.div`
  position: absolute;
  left: 5%;
  top: 50%;
  transform: ${({bookC}) => bookC ? 'scale(0.4) translateY(-45%)' : 'scale(1) translateY(15vh)' };
  font-size: 130px;
  background: ${({theme}) => theme.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  transform-origin: top left;
  transition: transform 0.5s;
  font-family: 'Alex Brush', cursive;
  font-weight: 900;

  @media only screen and (max-width: 600px) {
    font-size: 70px;
    transform: ${({bookC}) => bookC ? 'scale(0.5) translateY(-50%)' : 'scale(1) translateY(9vh)' };
  }

  &>img {
    width: 100%;
  }
`

const Burger = styled.div`
  width: 28px;
  height: 17px;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    height: 2.5px;
   
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${({theme}) => theme.primary};
    }
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 40%;
    height: 3px;
    background: ${({theme}) => theme.primary};
    transition: 0.4s;
  }

  &::after {
    top: auto;
    left: 40%;
    right: 0;
    bottom: 0;
  }

  &:hover:after {
    left: 0;
  }
  &:hover:before {
    right: 0;
  }
`

const Containter = styled.div`
  padding: 20px 5%;
  background: #101010;
  background: ${({theme}) => theme.background};
  box-shadow: ${({darkTheme}) => darkTheme ? '0 0 5px rgba(0, 0, 0, 0.9)' : '0 0 5px rgba(0, 0, 0, 0.3)'};
  position: fixed;
  width: 100vw;
  color: white;
  z-index: 200;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media only screen and (max-width: 600px) {
    justify-content: ${({bookC, loggedIn}) => bookC ? 'flex-end' : loggedIn ? 'flex-end' : 'space-between' };
  }
`

const Login = styled.span`
  margin: 0 85px 0 0;
  cursor: pointer;
  color: ${({theme}) => theme.textColor};;
`

const Register = styled.button`
  margin: 0 15px 0 0;
  cursor: pointer;
  background: ${({theme}) => theme.primary};
  color: white;
  border: 0;
  padding: 7px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`
