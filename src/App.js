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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')

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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const notifyUser = (message, className) => {
    setNotification({message, className})
    setTimeout(() => {
        setNotification(null)
    }, 3000)
}

  const showLogin = () => (

        <div>
          <h3>Login</h3>
          <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
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
        <Blog key={blog.id} blog={blog} />
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