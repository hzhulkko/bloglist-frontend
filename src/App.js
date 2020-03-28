import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogsUser'))
    if (user) {
      setUser(user)
    }
  }, [])

  const getUser = () => {
    return user
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      setUser(user)
    } catch (e) {
      notifyUser(e.response.data.error, 'error')
    }
  }
  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      notifyUser(`${blog.title} by ${blog.author} added`)
    } catch (e) {
      notifyUser(e.response.data.error, 'error')
    }
  }

  const likeBlog = async (id, updatedBlog) => {
    try {
      const blog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
      notifyUser(`${blog.title} by ${blog.author} liked!`)
    } catch (e) {
      notifyUser(e.response.data.error, 'error')
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (e) {
      notifyUser(e.response.data.error, 'error')
    }
  }

  const notifyUser = (message, className) => {
    setNotification({ message, className })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const showLogin = () => (

    <div>
      <h3>Login</h3>
      <LoginForm
        login={login}
      />
    </div>
  )

  const showBlogs = () => (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='add new blog'>
        <BlogForm
          addblog={addBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          getUser={getUser}
        />
      )}
    </div>
  )

  const showNotification = () => (
    <div>
      <Notification notification={notification}/>
    </div>

  )

  return (
    <div>
      {notification !== null && showNotification()}
      <h2>blogs</h2>
      {user === null ? showLogin()
        : showBlogs()}

    </div>
  )
}

export default App