import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { signUserUp, authError, setError } from '../../Store/action/userActions'
import { motion, AnimatePresence } from 'framer-motion'
import { Error } from './Error'
import {clearError} from '../../Store/action/userActions'
import { closeRegisterModal } from '../../Store/action/authModalActions'

export const Register = () => {
  const dispatch = useDispatch()

  const register = (e) => {
    e.preventDefault()

    const [username, email, password, confirmPassword] = e.target.elements

    if(username.value !== '') {
      if(password.value.length >= 6) {
        if(password.value === confirmPassword.value) {
          dispatch(signUserUp({
            username: username.value,
            email: email.value,
            password: password.value
          }))
        } else {
          dispatch(authError())
          dispatch(setError("Passwords don't match."))
        }
      } else {
        dispatch(authError())
        dispatch(setError("Password must have at least 6 characters."))
      }
    } else {
      dispatch(authError())
      dispatch(setError("Please provide your username."))
    }
  }

  return (
    <AnimatePresence>
      <Container>
        <motion.form 
          onSubmit={register}
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0, transition: {duration: 0.4}}}
          exit={{opacity: 0, transition: {duration: 0.3}}}>

          <h2>Register</h2>
          <input type='text' name='username' placeholder='username' />
          <input type='email' name='email' placeholder='email' />
          <input type='password' name='password' placeholder='password' />
          <input type='password' name='confirmPassword' placeholder='confirm password' />
          <input type='submit' value='Register' />

          <Error />
          <Close onClick={() => {
            dispatch(closeRegisterModal())
            dispatch(clearError())
          }} />
        </motion.form>
      </Container>
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    position: relative;
    padding: 50px 30px 40px;
    background: ${({theme}) => theme.background};
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    color: ${({theme}) => theme.textColor};
    width: 400px;

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

const Close = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  &:before,
  &:after {
    width: 2px;
    background: ${({theme}) => theme.primary};
    content: '';
    position: absolute;
    top: 0;
    right: calc(50% - 1px);
    height: 100%;
    transform: rotate(45deg);
    transform-origin: center;
  }

  &:after {
    transform: rotate(135deg);
  }
`