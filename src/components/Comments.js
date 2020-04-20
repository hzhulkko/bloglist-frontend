import React from 'react'
import { useSelector } from 'react-redux'

const Comments = () => {

  const blog = useSelector(state => state.currentBlog)

  return(
    <div id='blog-comments'>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Comments