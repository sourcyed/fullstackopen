import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(({ users }) => users )
  if (!users)
    return

  return (
    <div>
      <table>
        <tr>
          <td></td>
          <td><strong>blogs created</strong></td>
        </tr>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              {user.username}
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Users