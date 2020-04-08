import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))

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