import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Error } from './Error'
import { logUserOut, updateUser, updatePassword } from '../../Store/action/userActions'
import { closeSidebar } from '../../Store/action/sidebarActions'

export const UpdateAccount = () => {
  const user = useSelector(state => state.userReducer.user)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [changePass, setChangePass] = useState(false)
  const dispatch = useDispatch()

  const updateAccount = (e) => {
    e.preventDefault()
    const [username, email] = e.target.elements
    dispatch(updateUser(user.id, username.value, email.value))
  }

  const resetPassword = (e) => {
    e.preventDefault()

    const [email] = e.target.elements

    dispatch(updatePassword(email.value))
  }

  return (
    <Container>
      <h3>Update account</h3>
      {changePass
        ? <div>
            <form onSubmit={resetPassword}>
              <input type='email' name='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
              <input type='submit' value='Reset Password' />
              <Error />
            </form>
          </div>
        : <form onSubmit={updateAccount}>
            <input type='text' name='username' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
            <input type='email' name='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='submit' value='Update' />
            <Error />
          </form>
      }
      <span onClick={() => setChangePass(!changePass)}>
        {changePass
          ? <i><u>update account</u></i>
          : <i><u>reset password</u></i>
        }
      </span>
      <Logout onClick={() => {
          dispatch(logUserOut())
          dispatch(closeSidebar())
        }}>Logout</Logout>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 0 40px;

  h3 {
    margin-bottom: 15px;
  }

  span {
    color: ${({theme}) => theme.secondary};
    font-size: 12px;
    display: inline-block;
    margin-top: 10px;
    cursor: pointer;
  }

  input {
    padding: 10px 15px;
    display: block;
    width: 100%;
    margin: 0 0 25px;
    border-radius: 55px;
    background: none;
    border: 1px solid ${({theme}) => theme.secondary};
    color: ${({theme}) => theme.textColor};

    &[type='submit'] {
      background: ${({theme}) => theme.secondary};
      cursor: pointer;
      margin: 0;
      color: white;
    }
  }
`
const Logout = styled.button`
  background: ${({theme}) => theme.primary};
  display: block;
  border-radius: 50px;
  text-align: center;
  padding: 10px;
  border: 0;
  margin: 40px 0 0;
  width: 100%;
  color: white;
  font-weight: 300;
  cursor: pointer;
`