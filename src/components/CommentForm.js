import React, { createRef } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = (props) => {

  const dispatch = useDispatch()
  let comment = createRef()

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(props.id, { comment: comment.current.value }))
    comment.current.value = ''

  }

  return(
    <form onSubmit={handleComment}>
      <input id='comment' type='text' ref={comment}></input>
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm