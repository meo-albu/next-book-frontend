import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

export const Comment = (props) => {
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${props.comment.user}`)
    .then(response => {
      setUserName(response.data.username)
    })
  }, [props.comment.user])

  return (
      <Container darkTheme={darkTheme} ><span>{userName}</span>: {props.comment.comment}</Container>
  )
}

const Container = styled.p`
  font-size: 14px;
  margin-bottom: 0 !important;
  margin-left: 10px;
  padding-left: 10px;
  padding-bottom: 0 !important;
  border-left: 1px solid ${({theme}) => theme.secondary};

  span {
    color: ${({theme, darkTheme}) => darkTheme ? theme.secondary : theme.primary};
  }
`