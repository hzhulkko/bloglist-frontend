import React from 'react'
import LoginForm from './LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../reducers/loginReducer'

const Header = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (username, password) => {
    dispatch(login(username, password))
  }

  if (!currentUser) {
    return (
      <div>
        <h3>Login</h3>
        <LoginForm
          login={handleLogin}
        />
      </div>
    )
  } else {
    return (
      <div>
        <p>Logged in as {currentUser.name}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

}

export default Header