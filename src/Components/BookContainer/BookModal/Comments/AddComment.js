import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {getBook} from '../../../../Store/action/modalActions'
import {SendButton} from './SendButton'
import { openLoginModal } from '../../../../Store/action/authModalActions'

export const AddComment = (props) => {
  const user = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()

  const addComment = e => {
    e.preventDefault()
    const {comment} = e.target.elements

    const comm = {
      comment: comment.value,
      user,
      book: props.book
    }

    if(comment.value.length > 0) {
      if(user.id) {
        axios.post(`${process.env.REACT_APP_API_URL}/comments`, comm, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }).then(response => {
          dispatch(getBook(response.data.book.id))
          comment.value = ''
        })
      } else {
        dispatch(openLoginModal())
      }
    }

    
  }

  return (
    <Container>
      <form onSubmit={addComment}>
        <textarea name="comment" rows="1" placeholder="Say your opinion...">

        </textarea>
        <button type="submit"><SendButton /></button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  margin: 10px 0 15px;

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    textarea {
      flex: 10;
      background: none;
      border: none;
      border-radius: 6px;
      padding: 10px;
      border: 1px solid ${({theme}) => theme.secondary};
      color: ${({theme}) => theme.textColor};
      resize: none;

      @media only screen and (max-width: 600px) {
        margin-right: 10px
      }
    }

    button {
      flex: 1;
      width: 20px;
      background: none;
      border: none;
      cursor: pointer;
      transition: transform 0.3s;

      :hover {
        transform: scale(1.1);
      }
    }
  }
`
