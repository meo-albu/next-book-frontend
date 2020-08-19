import React from 'react'
import { useSelector } from 'react-redux'
import { Comment } from './Comment'

export const Comments = (props) => {
  const comments = useSelector(state => state.commentReducer.comments)

  return (
    comments.map(comment => {
      if(comment.book.id === props.book.id)
        return <Comment key={comment.id} comment={comment.comment} user={comment.user.username} />

        return false
    })
  )
}