import React from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'


const BlogView = () => {

  const user = useSelector(state => state.user)

  if (!user) {
    return null
  }

  return (
    <div id='blog-view'>
      <h2>Blogs</h2>
      <Togglable buttonLabel='add new blog'>
        <BlogForm/>
      </Togglable>
      <BlogList/>
    </div>

  )
}

export default BlogView

