import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBook, closeDeleteBookModal } from '../../../Store/action/bookActions'
import { closeModal } from '../../../Store/action/modalActions'
import { deleteAllBookComments } from '../../../Store/action/commentActions'

export const DeleteBook = () => {
  const bookDetails = useSelector(state => state.bookReducer.book)
  const comments = useSelector(state => state.commentReducer.comments)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const dispatch = useDispatch()

  const confirmDeleteBook = () => {
    dispatch(deleteBook(bookDetails.id))
    dispatch(closeDeleteBookModal())
    dispatch(closeModal())
    comments.forEach(comment => {
      if(comment.book.id === bookDetails.id) {
        dispatch(deleteAllBookComments(comment.id, bookDetails.id))
      }
    });
    
  }

  return (
    <>
      <Container darkTheme={darkTheme}>
        <CloseModal onClick={() => dispatch(closeDeleteBookModal()) } />
          Are you sure you want to delete this book?
          <button onClick={confirmDeleteBook} >Delete book</button>
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

  button {
    border: 0;
    background: ${({theme}) => theme.primary};
    cursor: pointer;
    display: block;
    margin-top: 20px;
    padding: 10px;
    border-radius: 6px;
    width: 100%;
    color: ${({theme}) => theme.textColor};
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
