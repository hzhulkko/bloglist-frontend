let timeoutId = null

export const success = (message, seconds) => {
  return async dispatch => {
    dispatch(
      {
        type: 'SUCCESS',
        data: { message, className: 'success' }
      }
    )
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(hide())
    }, seconds*1000)
  }
}

export const error = (message, seconds) => {
  return async dispatch => {
    dispatch(
      {
        type: 'ERROR',
        data: { message, className: 'error' }
      }
    )
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(hide())
    }, seconds*1000)
  }
}

const hide = () => {
  return {
    type: 'HIDE'
  }

}

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SUCCESS':
    return action.data
  case 'ERROR':
    return action.data
  case 'HIDE':
    return null
  default:
    return state
  }
}

export default notificationReducer