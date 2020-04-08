import React, { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { getAll, add } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (username, password) => {
    dispatch(login(username, password))
  }
  const showLogin = () => (

    <div>
      <h3>Login</h3>
      <LoginForm
        login={handleLogin}
      />
    </div>
  )

  const showBlogs = () => (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='add new blog'>
        <BlogForm/>
      </Togglable>
      <div id='blog-list'>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
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