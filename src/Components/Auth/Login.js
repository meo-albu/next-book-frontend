import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { logUserIn, updatePassword } from '../../Store/action/userActions'
import { motion } from 'framer-motion'
import { Error } from './Error'
import {clearError} from '../../Store/action/userActions'
import { closeLoginModal } from '../../Store/action/authModalActions'

export const Login = () => {
  const dispatch = useDispatch()
  const [forgot, setForgot] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if(forgot) {
      const [email] = e.target.elements
      dispatch(updatePassword(email.value))
    } else {
      const [username, password] = e.target.elements
    
      dispatch(logUserIn({
        identifier: username.value,
        password: password.value
      }))
    }
  }


  return (
    <Container>
      {forgot 
      ? <div>
        <motion.form 
          onSubmit={handleSubmit}
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0, transition: {duration: 0.4}}}
          exit={{opacity: 0, transition: {duration: 0.3}}}>

          <h2>Reset password</h2>
          <input type='text' name='email' placeholder='email' />
          <input type='submit' value='Reset Password' />
          <Error />
          <Close onClick={() => {
            dispatch(closeLoginModal())
            dispatch(clearError())
          }} />
          <span onClick={() => setForgot(!forgot)}>
            {forgot
              ? <i><u>go back to login</u></i>
              : <i><u>reset password</u></i>
            }
          </span>
        </motion.form>
      </div>
      : <motion.form 
          onSubmit={handleSubmit}
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0, transition: {duration: 0.4}}}
          exit={{opacity: 0, transition: {duration: 0.3}}}>

          <h2>Login</h2>
          <input type='text' name='username' placeholder='username' />
          <input type='password' name='password' placeholder='password' />
          <input type='submit' value='Login' />
          <Error />
          <Close onClick={() => {
            dispatch(closeLoginModal())
            dispatch(clearError())
          }} />
          <span onClick={() => setForgot(!forgot)}>
            {forgot
              ? <i><u>go back to login</u></i>
              : <i><u>forgot password?</u></i>
            }
          </span>
        </motion.form>}
    </Container>
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

    >span {
      color: ${({theme}) => theme.secondary};
      font-size: 12px;
      display: inline-block;
      margin-top: 10px;
      cursor: pointer;
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