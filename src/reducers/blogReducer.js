import blogService from '../services/blogs'

const dispatchError = (dispatch, error) => {
  dispatch(
    {
      type: 'ERROR',
      data: { message: error.response.data.error, className: 'error' }
    }
  )
}

const dispatchSuccess = (dispatch, message) => {
  dispatch(
    {
      type: 'SUCCESS',
      data: { message, className: 'success' }
    }
  )
}

export const add = (newBlog) => {
  return dispatch => {
    blogService.create(newBlog)
      .then(blog => {
        dispatch(
          {
            type: 'ADD',
            data: blog
          }
        )
        dispatchSuccess(dispatch, `${blog.title} by ${blog.author} added`)
      })
      .catch(error => {
        dispatchError(dispatch, error)

      })
  }
}

export const update = (id, updatedBlog) => {
  return dispatch => {
    blogService.update(id, updatedBlog)
      .then(blog => {
        dispatch(
          {
            type: 'UPDATE',
            data: blog
          }
        )
        dispatchSuccess(dispatch, `${blog.title} by ${blog.author} voted`)
      })
      .catch(error => {
        dispatchError(dispatch, error)

      })
  }
}

export const remove = (id) => {
  return dispatch => {
    blogService.remove(id)
      .then(() => {
        dispatch(
          {
            type: 'DELETE',
            data: { id }
          }
        )
      })
      .catch(error => {
        dispatchError(dispatch, error)
      })
  }
}

export const getAll = () => {
  return dispatch => {
    blogService.getAll()
      .then(blogs => {
        dispatch(
          {
            type: 'GET_ALL',
            data: blogs
          }
        )
      })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_ALL':
    return action.data
  case 'ADD':
    return [...state, action.data]
  case 'UPDATE':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export default blogReducer