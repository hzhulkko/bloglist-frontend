import React from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'


const BlogView = () => {

  const currentUser = useSelector(state => state.currentUser)

  if (!currentUser) {
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

