import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Image } from './Image'
import { BookContainer } from '../BookContainer/BookContainer'
import { Bg } from './Bg'
import { PhoneBg } from './PhoneBg'
import { showBookContainer, hideBookContainer } from '../../Store/action/bookContainerActions'
import { openLoginModal } from '../../Store/action/authModalActions'
import { openShareModal } from '../../Store/action/shareBookActions'
import { motion } from 'framer-motion'

export const Main = ({children}) => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const bookC = useSelector(state => state.bookContainerReducer.bookContainer)
  const dispatch = useDispatch()

  const shareBook = () => {
    if(loggedIn) {
      dispatch(openShareModal())
    } else {
      dispatch(openLoginModal())
    }
  }

  const showHideBooks = () => {
    !bookC && dispatch(showBookContainer())
    bookC && dispatch(hideBookContainer())
  }

  return (
    <Container theme={themeStyle} darkTheme={darkTheme}>
        <Bg />
        <PhoneBg />
        <Image />
      {children}
      <p>A place where you can find <br />your next book to read...</p>
        <span>… or share a book you love</span>
        <div>
          <Button primary onClick={() => dispatch(showBookContainer())} >Find a book</Button>
          <Button onClick={shareBook} >Share a book</Button>
        </div>
        <motion.div
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%'
        }}
          animate={{ y: bookC ? [20, 10] : [0, 10] }}
          transition={{
            type: 'spring',
            y: {yoyo: Infinity, duration: 0.6},
            scaleY: {ease: 'easeInOut'}
          }} 
        >
          <OpenCloseContainer onClick={showHideBooks} theme={themeStyle} darkTheme={darkTheme} bookC={bookC}/>
        </motion.div>
        <BookContainer />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  bottom: 0;
  top: 0;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.textColor};
  transition: ${({theme}) => theme.transition};
  z-index: 0;
  padding: 0 5% 150px;
  font-size: 65px;
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
    font-size: 32px;
    margin-top: 10px
  }

  @media only screen and (max-width: 1360px) {
    font-size: 45px;
  }

  @media only screen and (max-width: 425px) {
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    color: white;
  }

  @media only screen and (max-width: 600px) {
    line-height: 1.25;
    font-size: 32px;
    padding-top: 100px;
    display: block;

    &>span {
      font-size: 22px;
    }

    br {
      display: none;
    }
  }

`

const Button = styled.button`
  padding: 15px 70px;
  border-radius: 55px;
  background: ${({theme, primary}) => primary ? theme.primary : theme.background};
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
    margin-top: ${({primary}) => primary ? '15vh' : '15px'};
  }
`

const OpenCloseContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) ${({bookC}) => bookC ? 'rotateX(180deg)' : 'rotateX(0)' };;
  width: 65px;
  height: 30px;
  transform-origin: center center;
  transition: transform 0.8s;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    top: -5px;
  }

  @media only screen and (min-width: 600px) {
    display: none;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 5px;
    background: ${({theme, darkTheme}) => darkTheme ? theme.secondary : theme.primary};
    width: 50%;
    height: 5px;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: center;
  }

  &:before {
    left: 2px;
    transform: rotate(-15deg)
  }
  &:after {
    right: 2px;
    transform: rotate(15deg)
  }
`