import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const UserList = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch, currentUser])

  if (!currentUser || users.length === 0) {
    return null
  }
  console.log('users...', users)
  return(
    <div id='user-list'>
      <h3>Users</h3>
      <table>
        <thead>
          <tr><th>User</th><th>Blogs added</th></tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList