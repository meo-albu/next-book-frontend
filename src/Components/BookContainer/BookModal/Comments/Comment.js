import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

export const Comment = (props) => {
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)

  return (
      <Container darkTheme={darkTheme} ><span>{props.user}</span>: {props.comment}</Container>
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