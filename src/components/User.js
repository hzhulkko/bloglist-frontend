import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleUser } from '../reducers/singleUserReducer'
import { useParams, Link } from 'react-router-dom'

const User = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  const user = useSelector(state => state.singleUser)

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [dispatch, id])

  const displayBlogs = () => {
    return (
      user.blogs.map(blog =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
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