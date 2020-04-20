import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { getOne, like } from '../reducers/blogReducer'
import { remove } from '../reducers/blogListReducer'
import CommentForm from './CommentForm'
import Comments from './Comments'

const Blog = () => {

  const dispatch = useDispatch()
  const match = useRouteMatch('/blogs/:id')
  const id = match ? match.params.id : null
  const history = useHistory()
  const currentUser = useSelector(state => state.currentUser)
  const blog = useSelector(state => state.currentBlog)
  console.log(blog)

  useEffect(() => {
    dispatch(getOne(id))
  }, [dispatch, id])

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (id, updatedBlog) => {
    dispatch(like(id, updatedBlog))
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
      <CommentForm id={blog.id}/>
      <Comments blog={blog}/>
    </div>
  )

}

export default Blog