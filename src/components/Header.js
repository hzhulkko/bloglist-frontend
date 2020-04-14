import React from 'react'
import LoginForm from './LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../reducers/loginReducer'

const Header = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (username, password) => {
    dispatch(login(username, password))
  }

  if (!user) {
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
        <p>Logged in as {user.name}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

}

export default Header