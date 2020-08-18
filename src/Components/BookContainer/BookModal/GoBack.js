import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../Store/action/modalActions'

export const GoBack = () => {
  const dispatch = useDispatch()
  return (
    <Container onClick={() => dispatch(closeModal())}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="25" viewBox="0 0 16.56 30.105">
          <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M16.243,21.242,27.2,9.86a2.2,2.2,0,0,0,0-3.038,2.024,2.024,0,0,0-2.932,0l-12.417,12.9a2.209,2.209,0,0,0-.06,2.966L24.262,35.671a2.026,2.026,0,0,0,2.932,0,2.2,2.2,0,0,0,0-3.038Z" transform="translate(-11.251 -6.194)" fill="rgba(255,255,255,0.58)"/>
        </svg>

        close
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 15px;
  left: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 13px;
  opacity: 0.7;
  transition: opacity 0.3s;

  @media only screen and (max-width: 600px) {
    top: 10px;
    left: 10px;
    font-size: 12px;
  }

  &:hover {
    opacity: 1
  }

  svg {
    margin-right: 10px;
  }
`