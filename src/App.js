import React from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './reducers/loginReducer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
      <BlogList/>
      <UserList/>
    </div>
  )


  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      {user === null ? showLogin()
        : showBlogs()}

    </div>
  )
}

export default App