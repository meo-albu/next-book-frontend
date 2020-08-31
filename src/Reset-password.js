import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Error } from './Components/Auth/Error'
import { Toast } from './Components/Toast'
import { setError } from './Store/action/userActions'
import { Link } from 'react-router-dom'
import { resetPassword } from './Store/action/userActions'

export const ResetPassword = () => {
  const toast = useSelector(state => state.toastReducer.isOpen)
  const toastMessage = useSelector(state => state.toastReducer.message)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const [password, confirmPassword] = e.target.elements

    if(password.value.length >= 6) {
      if(password.value === confirmPassword.value) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code')
        dispatch(resetPassword(code, password.value, confirmPassword.value))
      } else {
        dispatch(setError("Passwords don't match!"))
      }
    } else {
      dispatch(setError("Password must contain at least 6 characters!"))
    }
  }

  return (
    <Container>
      <AnimatePresence>
        {toast && <Toast>{toastMessage}</Toast>}
      </AnimatePresence>
      
      <motion.form 
        onSubmit={handleSubmit}
        initial={{opacity: 0, y: 100}}
        animate={{opacity: 1, y: 0, transition: {duration: 0.4}}}
        exit={{opacity: 0, transition: {duration: 0.3}}}>

        <Link to='/'>Go back to home</Link>
        <h2>Reset password</h2>
        <input type='password' name='password' placeholder='password' />
        <input type='password' name='confirmPassword' placeholder='confirm password' />
        <input type='submit' value='Reset password' />
        <Error />
      </motion.form>
    </Container>
  )
}

const Container = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: ${({theme}) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.textColor};

  form {
    position: relative;
    padding: 30px 30px 40px;
    background: ${({theme}) => theme.background};
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    color: ${({theme}) => theme.textColor};
    width: 400px;

    a {
      color: ${({theme}) => theme.primary};
      font-weight: 600;
      font-style: italic;
      text-decoration: none;
      margin-bottom: 25px;
      font-size: 12px;
      display: inline-block;
      position: absolute;
      top: -50px;
      left: 0;

      @media only screen and (max-width: 600px) {
        position: static;
      }
    }

    @media only screen and (max-width: 600px) {
      width: 100vw;
      height: 100%;
      border-radius: 0;
      padding: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
    }
  }

  input {
    padding: 10px;
    display: block;
    width: 100%;
    margin: 25px 0;
    border-radius: 5px;
    background: none;
    border: 1px solid ${({theme}) => theme.primary};
    color: ${({theme}) => theme.textColor};

    &[type='submit'] {
      background: ${({theme}) => theme.primary};
      cursor: pointer;
      margin: 0;
      color: white;
    }
  }
`