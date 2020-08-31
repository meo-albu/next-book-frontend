import React from 'react'
import { useSelector } from 'react-redux'
import { Comment } from './Comment'
import styled from 'styled-components'
import { EditComment } from './EditComment'
import { DeleteComment } from './DeleteComment'

export const Comments = (props) => {
  const comments = useSelector(state => state.commentReducer.comments)
  const {editIsOpen, deleteIsOpen } = useSelector(state => state.commentReducer)

  return (
    comments.length === 0 
      ? <P>No comments yet...</P> :
      <div>
        {editIsOpen && <EditComment />}
        {deleteIsOpen && <DeleteComment />}
        {comments.map(comment => {
            if(comment.book.id === props.book.id)
              return <Comment key={comment.id} comment={comment.comment} user={comment.user.username} commentId={comment.id} userId={comment.user.id} date={comment.updated_at} />
            return false
        })}
      </div>
  )
}

const P = styled.p`
  opacity: 0.7;
  font-size: 12px;
  font-style: italic;
  margin-bottom: 10px;
  color: ${({theme}) => theme.textColor};
`