import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Toast = ({children}) => {
  return (
      <Container
        initial={{opacity: 0, y: -100, translateX: '-50%'}}
        animate={{opacity: 1, y: 0, translateX: '-50%', transition: {duration: 0.2}}}
        exit={{opacity: 0, y: -100, transition: {duration: 0.3}}}
      >{children}</Container>
  )
}

const Container = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 40px;
  border-radius: 5px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  background: ${({theme}) => theme.primary};
  color: white;
  z-index: 2000;

  @media only screen and (max-width: 600px) {
    padding: 10px 25px;
  }
`