import React, { useEffect } from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleUser } from '../reducers/singleUserReducer'
import { useParams } from 'react-router-dom'

const User = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  const user = useSelector(state => state.singleUser)

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [dispatch])

  const displayBlogs = () => {
    return (
      user.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )
    )
  }

  if (!user) {
    return null
  }

  return(
    <div id='user-blog-list'>
      <h3>{user.name}</h3>
      {user.blogs.length > 0 ? displayBlogs() : <span>No blogs added</span>}
    </div>
  )
}

export default User