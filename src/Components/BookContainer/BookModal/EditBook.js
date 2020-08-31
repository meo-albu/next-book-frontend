import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { closeEditBookModal, editBook } from '../../../Store/action/bookActions'

export const EditBook = () => {
  const bookDetails = useSelector(state => state.bookReducer.book)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const dispatch = useDispatch()

  const [description, setDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(editBook(bookDetails.id, e.target.elements.description.value))
    dispatch(closeEditBookModal())
  }

  useEffect(() => setDescription(bookDetails.description), [bookDetails.description])
  const handleChange = e => setDescription(e.target.value)

  return (
    <>
      <Container darkTheme={darkTheme}>
        <CloseModal onClick={() => dispatch(closeEditBookModal()) } />
          {bookDetails.title}, <strong><i> by {bookDetails.author}</i></strong>
        <form onSubmit={handleSubmit}>
          <i>Description</i>
          <input type="text" name="description" value={description} onChange={handleChange} />
          <input type="submit" value="Edit book" />
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

  strong {
    font-size: 12px;
    font-weight: 600;
    color: ${({darkTheme, theme}) => darkTheme ? theme.secondary : theme.primary};
  }
  
  form {
    margin-top: 15px;

    i {
      font-size: 12px;
      padding: 0 0 5px 5px;
      display: block;
      opacity: 0.7;
    }
  }

  input {
    display: block;
    background: none;
    border: 0.5px solid ${({theme}) => theme.secondary};
    padding: 10px;
    border-radius: 6px;
    background: none;
    color: ${({theme}) => theme.textColor};
    width: 100%;

    &[type="submit"] {
      margin-top: 20px;
      color: white;
      background: ${({theme}) => theme.primary};
      border: 0;
      cursor: pointer;
    }
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
