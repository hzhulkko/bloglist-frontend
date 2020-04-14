import userService from '../services/users'

export const getAll = () => {
  return dispatch => {
    userService.getAll()
      .then(users => {
        dispatch(
          {
            type: 'GET_USERS',
            data: users
          }
        )
      })
  }
}

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export default userReducer