import loginService from '../services/login'
import { error } from './notificationReducer'
import localStorageItem from '../config'

let loggedUser = JSON.parse(window.localStorage.getItem(localStorageItem))
const initialUser = loggedUser ? loggedUser : null

export const login = (username, password) => {
  return dispatch => {
    loginService.login({ username, password })
      .then(user => {
        window.localStorage.setItem(localStorageItem, JSON.stringify(user))
        dispatch(
          {
            type: 'LOGIN',
            data: user
          }
        )
      })
      .catch(e => {
        dispatch(error(e.response.data.error, 5))
      })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem(localStorageItem)
    dispatch(
      {
        type: 'LOGOUT',
      }
    )
  }
}

const userReducer = (state = initialUser, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state

  }
}

export default userReducer