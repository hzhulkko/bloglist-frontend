import React from 'react'
import Notification from './components/Notification'
import Header from './components/Header'
import BlogView from './components/BlogView'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {

  const padding = { padding: 5 }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <Notification/>
        <Header/>
        <Switch>
          <Route path='/users'>
            <UserList/>
          </Route>
          <Route path='/'>
            <BlogView/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App