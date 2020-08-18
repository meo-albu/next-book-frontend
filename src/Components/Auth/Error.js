import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

export const Error = () => {
  const error = useSelector(state => state.errorReducer.error)

  return (
    <Container>
      <AnimatePresence>
        {error &&
          <motion.div
          initial={{opacity: 0, y: -100}}
          animate={{opacity: 1, y: 0, transition: {duration: 0.4}}}
          exit={{opacity: 0, transition: {duration: 0.3}}}>
            {error}
          </motion.div>}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled.div`
  color: rgb(255, 100, 100);
  font-size: 12px;
  padding: 20px 0 0;
  height: 15px;
`
