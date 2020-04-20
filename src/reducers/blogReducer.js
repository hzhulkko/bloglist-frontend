import blogService from '../services/blogs'
import { error, success } from './notificationReducer'

export const getOne = (id) => {
  return dispatch => {
    blogService.getOne(id)
      .then(blog => {
        dispatch(
          {
            type: 'UPDATE',
            data: blog
          }
        )
      })
      .catch(e => {
        dispatch(error(e.response.data.error, 3))

      })
  }
}

export const like = (id, updatedBlog) => {
  return dispatch => {
    blogService.update(id, updatedBlog)
      .then(blog => {
        dispatch(
          {
            type: 'UPDATE',
            data: blog
          }
        )
        dispatch(success(`${blog.title} by ${blog.author} liked`, 3))
      })
      .catch(e => {
        dispatch(error(e.response.data.error, 3))

      })
  }
}

export const addComment = (id, comment) => {
  return dispatch => {
    blogService.addComment(id, comment)
      .then(blog => {
        dispatch(
          {
            type: 'UPDATE',
            data: blog
          }
        )
        dispatch(success('Comment added', 3))
      })
      .catch(e => {
        dispatch(error(e.response.data.error, 3))
      })
  }
}

const blogReducer = (state = null, action) => {
  switch(action.type) {
  case 'UPDATE':
    return action.data
  case 'DELETE':
    return null
  default:
    return state
  }
}

export default blogReducer