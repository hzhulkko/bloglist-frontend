import React, {useState} from 'react'

const Blog = ({ blog, likeBlog, removeBlog, getUser }) => {

  const [viewFull, setViewFull] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setViewFull(!viewFull)
  }

  const handleLike = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    likeBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      removeBlog(blog.id)
    }
  }

  const showRemoveButton = () => {
    const currentUser = getUser()
    if (currentUser.username === blog.user.username) {
      return (
        <button onClick={handleRemove}>remove</button>
      )
    }
    return null
  }

  if (viewFull) {
    return (
      <div style={blogStyle}>
        <p>
        {blog.title} by {blog.author}
        <button onClick={toggleView}>{viewFull ? 'hide' : 'view'}</button>
        </p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user.name}</p>
        {showRemoveButton()}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <p>
        {blog.title} by {blog.author}
        <button onClick={toggleView}>{viewFull ? 'hide' : 'view'}</button>
        </p>
      </div>
    )
}
}

export default Blog
