import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update, remove } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  const [viewFull, setViewFull] = useState(false)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (id, updatedBlog) => {
    dispatch(update(id, updatedBlog))
  }

  const removeBlog = async (id) => {
    dispatch(remove(id))
  }

  const toggleView = () => {
    setViewFull(!viewFull)
  }

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    likeBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      removeBlog(blog.id)
    }
  }

  const showRemoveButton = () => {
    if (currentUser.username === blog.user.username) {
      return (
        <button onClick={handleRemove}>remove</button>
      )
    }
    return null
  }

  if (viewFull) {
    return (
      <div style={blogStyle} className='blog'>
        <span>
          {blog.title} by {blog.author}
          <button onClick={toggleView}>{viewFull ? 'hide' : 'view'}</button>
        </span>
        <p className='url'>url: {blog.url}</p>
        <p className='likes'>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
        <p className='user'>user: {blog.user.name}</p>
        {showRemoveButton()}
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='blog'>
        <span>
          {blog.title} by {blog.author}
          <button onClick={toggleView}>{viewFull ? 'hide' : 'view'}</button>
        </span>
      </div>
    )
  }
}

export default Blog