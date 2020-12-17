import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { closeToast, openToast } from '../Store/action/toastActions'

const UnderDevelopmentFeature = () => {
  const dispatch = useDispatch()

  const underDevelopment = () => {
    setTimeout(() => {
      dispatch(closeToast())
    }, 2000);
    dispatch(openToast('This feature is currently under development.'))
  }

  return (
    <Container onClick={underDevelopment} />
  )
}

export default UnderDevelopmentFeature


const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`