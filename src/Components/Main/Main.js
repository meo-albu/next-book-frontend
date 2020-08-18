import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Image } from './Image'
import { BookContainer } from '../BookContainer/BookContainer'
import { Bg } from './Bg'
import { showBookContainer } from '../../Store/action/bookContainerActions'
import { openLoginModal } from '../../Store/action/authModalActions'
import { openShareModal } from '../../Store/action/shareBookActions'

export const Main = ({children}) => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const dispatch = useDispatch()

  const shareBook = () => {
    if(loggedIn) {
      dispatch(openShareModal())
    } else {
      dispatch(openLoginModal())
    }
  }

  return (
    <Container theme={themeStyle} darkTheme={darkTheme}>
        <Bg />
        <Image />
      {children}
      <p>A place where you can find <br />your next book to read...</p>
        <span>… or share a book you love</span>
        <div>
          <Button primary onClick={() => dispatch(showBookContainer())} >Find a book</Button>
          <Button onClick={shareBook} >Share a book</Button>
        </div>
        <BookContainer />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.textColor};
  transition: ${({theme}) => theme.transition};
  z-index: 0;
  padding: 110px 5.5% 50px;
  font-size: 3vw;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &>p,
  &>span {
    font-style: italic;
  }

  &>span {
    font-size: 2vw;
    margin-top: 10px
  }

  @media only screen and (max-width: 600px) {
    line-height: 1.2;
    font-size: 10vw;
    padding-top: 80px;

    &>span {
      font-size: 6.5vw;
    }

    br {
      display: none;
    }
  }

`

const Button = styled.button`
  padding: 15px 70px;
  border-radius: 55px;
  background: ${({theme, primary}) => primary ? theme.primary : 'transparent'};
  color: ${({theme, primary, darkTheme}) => primary ? 'white' : darkTheme ? theme.secondary : theme.primary};
  margin-right: ${({primary}) => primary ? '20px' : 0};
  font-weight: ${({primary}) => primary ? 300 : 600};
  border: 1px solid ${({theme}) => theme.primary};
  font-size: 18px;
  margin-top: 80px;
  cursor: pointer;
  transition: 0.3s;

  @media only screen and (max-width: 600px) {
    padding: 13px 70px;
    width: 100%;
    margin-right: 0;
    margin-top: ${({primary}) => primary ? '60px' : '10px'};
  }
`