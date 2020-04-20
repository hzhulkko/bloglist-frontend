import blogService from '../services/blogs'
import { error, success } from './notificationReducer'

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
        dispatch(success(`${blog.title} by ${blog.author} added`, 3))
      })
      .catch(e => {
        dispatch(error(e.response.data.error, 3))

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
      .catch(e => {
        dispatch(error(e.response.data.error, 3))
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

const blogListReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_ALL':
    return action.data
  case 'ADD':
    return [...state, action.data]
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export default blogListReducer