import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector(({ users }) => users)
  const match = useMatch('/users/:id')
  const user = match
    ? users.find((user) => user.id === match.params.id)
    : null
  if (!user)
    return (
      <h2 className="text-center text-xl font-semibold text-red-600 mt-8">
        User not found
      </h2>
    )

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{user.username}</h2>

      <h4 className="text-xl font-semibold mb-3 text-gray-700">Added blogs</h4>
      <ul className="list-disc list-inside space-y-2">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="text-gray-700 hover:text-blue-600 transition cursor-pointer">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
