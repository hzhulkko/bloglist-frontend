import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { update, remove } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import Comments from './Comments'

const Blog = () => {

  const dispatch = useDispatch()
  const id = useParams().id
  const history = useHistory()
  const currentUser = useSelector(state => state.currentUser)
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

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

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    likeBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      removeBlog(blog.id)
    }
    history.push('/')
  }

  const showRemoveButton = () => {
    if (currentUser.username === blog.user.username) {
      return (
        <button onClick={handleRemove}>remove</button>
      )
    }
    return null
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className='blog'>
      <span>
        {blog.title} by {blog.author}
      </span>
      <p className='url'>url: {blog.url}</p>
      <p className='likes'>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
      <p className='user'>user: {blog.user.name}</p>
      {showRemoveButton()}
      <CommentForm id={id}/>
      <Comments blog={blog}/>
    </div>
  )

}

export default Blog