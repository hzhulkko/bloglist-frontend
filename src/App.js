import React from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { useSelector } from 'react-redux'
import Header from './components/Header'

const App = () => {

  const user = useSelector(state => state.user)

  const showBlogs = () => (
    <div>
      <Togglable buttonLabel='add new blog'>
        <BlogForm/>
      </Togglable>
      <BlogList/>
      <UserList/>
    </div>
  )


  return (
    <div>
      <Notification/>
      <Header/>
      <h2>blogs</h2>
      {user === null ? null
        : showBlogs()}

    </div>
  )
}

export default App