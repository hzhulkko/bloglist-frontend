import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../reducers/blogListReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  return(
    <div id='blog-list'>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Link  to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList