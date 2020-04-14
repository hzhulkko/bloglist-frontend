import React, { useEffect } from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../reducers/blogReducer'

const BlogList = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  return(
    <div id='blog-list'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default BlogList