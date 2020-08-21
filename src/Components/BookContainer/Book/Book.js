import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getBook } from '../../../Store/action/modalActions'

export const Book = (props) => {
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const dispatch = useDispatch()

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: {stiffness: 1000, velocity: -100}
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: {stiffness: 1000}
      }
    }
  }

  return (
      <Container darkTheme={darkTheme} variants={variants} cover={props.cover} onClick={() => dispatch(getBook(props.id))}>
        <div>
          {props.title.length > 40 ? props.title.substring(0, 40) + '...' : props.title}
        </div>
      </Container>
  )
}

const Container = styled(motion.div)`
  position: relative;
  padding: 35px 15px;
  background-image: ${({cover}) => `url(${cover})`};
  background-size: 100%;
  background-position: center;
  border-radius: 9px; 
  height: 300px;
  width: 200px;
  margin-bottom: 65px;
  box-shadow: ${({darkTheme}) => darkTheme ? '0 0 15px rgba(0, 0, 0, 0.7)' : '0 0 15px rgba(0, 0, 0, 0.2)'};
  margin-right: 30px;
  cursor: pointer;

  div {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 10px 5px;
    font-size: 15px;
    text-align: center;
  }

  @media only screen and (max-width: 600px) {
    width: 250px;
    height: 350px;
    margin: 0 auto 70px;
  }
`