import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { error } from './reducers/notificationReducer'
import { getAll, add, update, remove } from './reducers/blogReducer'

const App = () => {

  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogsUser'))
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
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
      showError(e.response.data.error)
    }
  }
  const addBlog = async (newBlog) => {
    dispatch(add(newBlog))
  }

  const likeBlog = async (id, updatedBlog) => {
    dispatch(update(id, updatedBlog))
  }

  const removeBlog = async (id) => {
    dispatch(remove(id))
  }

  const showError = (message) => {
    dispatch(error(message, 3))
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
          addBlog={addBlog}
        />
      </Togglable>
      <div id='blog-list'>
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
    </div>
  )

  const showNotification = () => (
    <div>
      <Notification
        message={notification.message}
        className={notification.className}/>
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