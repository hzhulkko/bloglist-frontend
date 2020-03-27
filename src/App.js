import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
  const handleAdd = async (event) => {
    event.preventDefault()
    const newBlog = {title, author, url}
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const notifyUser = (message, className) => {
    setNotification({message, className})
    setTimeout(() => {
        setNotification(null)
    }, 3000)
}

  const showLogin = () => (
    <LoginForm
    handleLogin={handleLogin}
    handleUsernameChange={handleUsernameChange}
    handlePasswordChange={handlePasswordChange}
    username={username}
    password={password}
  />
  )

  const showBlogs = () => (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>logout</button>
      <BlogForm
        handleAdd={handleAdd}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        blog={{title, author, url}}
      />
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