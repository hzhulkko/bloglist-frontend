import userService from '../services/users'
import { error } from './notificationReducer'

export const getSingleUser = (id) => {
  return dispatch => {
    userService.getOne(id)
      .then(user => {
        dispatch({
          type: 'GET_SINGLE_USER',
          data: user
        })
      })
      .catch(e => {
        dispatch(error(e.response.data.error, 3))
      })
  }
}

const singleUserReducer = (state = null, action) => {
  switch(action.type) {
  case 'GET_SINGLE_USER':
    return action.data
  default:
    return state
  }
}

export default singleUserReducer