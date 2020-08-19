import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { hideBookContainer, showBookContainer } from '../../Store/action/bookContainerActions'
import { Book } from './Book/Book'

export const BookContainer = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const bookC = useSelector(state => state.bookContainerReducer.bookContainer)
  const books = useSelector(state => state.bookReducer.books)
  const dispatch = useDispatch()
  const ref = useRef();

  const showHideBooks = () => {
    !bookC && dispatch(showBookContainer())
    bookC && dispatch(hideBookContainer())
  }

  const variants = {
    open: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07
      }
    }
  }

  return (
    <Container theme={themeStyle} darkTheme={darkTheme} bookC={bookC} ref={ref}>
      <header>
        <motion.div
          animate={{ y: bookC ? [20, 10] : [0, 10] }}
          transition={{
            type: 'spring',
            y: {yoyo: Infinity},
            scaleY: {ease: 'easeInOut'}
          }} 
        >
          <OpenCloseContainer onClick={showHideBooks} theme={themeStyle} darkTheme={darkTheme} bookC={bookC}/>
        </motion.div>
      </header>

      <motion.section
        initial={false}
        animate={bookC ? "open" : "closed"}
      >
        <motion.div variants={variants}>
          {
            books.map(book => {
              return <Book 
                key={book.id}
                id={book.id}
                title={book.title} 
                description={book.description}
                user={book.user.username} 
                author={book.author} 
                likes={book.likes} 
                cover={book.cover}
                />
            })
          }
        </motion.div>
      </motion.section>
    </Container>
  )
}

const Container = styled.div`
  font-size: 16px;
  position: absolute;
  box-sizing: padding-box;
  transform: ${({bookC}) => bookC ? 'translateY(calc(-100% + 70px))' : 'translateY(0)' };
  transform-origin: top center;
  transition: transform 0.2s;
  height: calc(100% - 70px);
  bottom: calc(-100% + 140px);
  width: 100vw;
  top: auto;
  left: 0;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.textColor};
  box-shadow: ${({darkTheme}) => darkTheme ? '0 0 10px rgba(0, 0, 0, 0.8)' : '0 0 10px rgba(0, 0, 0, 0.2)' };
  padding: 0 calc(5% - 30px) 60px;
  border-radius: ${({bookC}) => bookC ? '0' : '1vw' };

  &>header {
    padding: 10px 0 20px;
  }

  @media only screen and (max-width: 600px) {
    transform: ${({bookC}) => bookC ? 'translateY(calc(-100% + 70px))' : 'translateY(100%)' };
    padding: 0 5px 120px;
    width: 100vw;
    left: 0;
    right: 0;
    border-width: 1px 0 0 0;
  }

  &>section {
    height: 100%;
    overflow-Y: scroll;
    padding: 30px;
    
    &>div {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      &:after {
        content: "";
        flex: auto;
      }
    }

    @media only screen and (max-width: 600px) {
      padding: 0 5px;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' };
      }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
    }

    &::-webkit-scrollbar-thumb {
        transition: 0.5s;
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
    }
  }
`

const OpenCloseContainer = styled.div`
  position: relative;
  top: 0;
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