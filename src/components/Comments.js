import React from 'react'

const Comments = ({ blog }) => {
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