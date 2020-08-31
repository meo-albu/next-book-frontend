import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { closeEditCommentModal, editComment } from '../../../../Store/action/commentActions'
import { SendButton } from './SendButton'

export const EditComment = () => {
  const comment = useSelector(state => state.commentReducer.commentToEdit)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const dispatch = useDispatch()

  const [comm, setComm] = useState('')

  const submitComment = e => {
    e.preventDefault()
    dispatch(editComment(comment.id, e.target.elements.comment.value))
    dispatch(closeEditCommentModal())
  }

  useEffect(() => setComm(comment.comment), [comment.comment])
  const handleChange = e => setComm(e.target.value)

  return (
    <>
      <Container darkTheme={darkTheme}>
        <CloseModal onClick={() => dispatch(closeEditCommentModal()) } />
          Edit comment
        <form onSubmit={submitComment}>
          <input type="text" name="comment" value={comm} onChange={handleChange} />
          <button type="submit"><SendButton /></button>
        </form>
      </Container>
      <Bg />
    </>
  )
}

const Container = styled.div`
  font-size: 13px;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 450px;
  max-width: 100%;
  transform: translate(-50%, -50%);
  padding: 40px 25px;
  z-index: 1600;
  background: ${({theme}) => theme.background};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  border-radius: 6px;

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  input {
    display: block;
    background: none;
    border: 1px solid ${({theme}) => theme.secondary};
    padding: 10px;
    border-radius: 6px;
    /* background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}; */
    background: none;
    color: ${({theme}) => theme.textColor};
    width: 90%;
  }
  
  button {
    border: 0;
    background: none;
    width: 5%;
    cursor: pointer;
  }
`

const Bg = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1500;
`

const CloseModal = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  :after,
  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2.5px;
    transform: rotate(45deg);
    transform-origin: center;
    z-index: 1601;
    border-radius: 3px;
    background: ${({theme}) => theme.primary};
  }

  :after {
    transform: rotate(-45deg);
  }
`
