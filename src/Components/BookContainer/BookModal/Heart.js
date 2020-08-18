import React from 'react'
// import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const Heart = (props) => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  // const [liked, setLiked] = useState(false)

  // useEffect(() => {
  //   setLiked(props.liked)
  // }, [props.liked])

  return (
      <Container style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26.371 25.666">
        <path id="Icon_ionic-ios-heart" data-name="Icon ionic-ios-heart" d="M21.185,3.938h-.059a6.666,6.666,0,0,0-5.566,3.046A6.666,6.666,0,0,0,10,3.938H9.936a6.624,6.624,0,0,0-6.561,6.62,14.261,14.261,0,0,0,2.8,7.774,49.075,49.075,0,0,0,9.385,9.04,49.075,49.075,0,0,0,9.385-9.04,14.261,14.261,0,0,0,2.8-7.774A6.624,6.624,0,0,0,21.185,3.938Z" transform="translate(-2.375 -2.938)" fill={props.liked ? themeStyle.primary : 'transparent'} stroke={themeStyle.primary} strokeWidth="2"/>
      </Container>
  )
}

const Container = styled.svg`
  transition: transform 0.3s;
  transform-origin: center;

  :hover {
    transform: scale(1.2)
  }
`