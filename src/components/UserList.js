import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../reducers/userReducer'

const UserList = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  return(
    <div id='user-list'>
      <h3>Users</h3>
      <table>
        <tr><th>User</th><th>Blogs added</th></tr>
        {users.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default UserList