import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector(({ users }) => users)
  const match = useMatch('/users/:id')
  const user = match
    ? users.find((user) => user.id === match.params.id)
    : null
  if (!user) return <h2>User not found</h2>

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
