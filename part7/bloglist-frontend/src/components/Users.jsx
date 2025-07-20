import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(({ users }) => users)
  if (!users) return null

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-4 font-semibold">User</th>
            <th className="text-left py-2 px-4 font-semibold">Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50 transition cursor-pointer"
            >
              <td className="py-2 px-4">
                <Link
                  to={user.id}
                  className="text-blue-600 hover:underline"
                >
                  {user.username}
                </Link>
              </td>
              <td className="py-2 px-4">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
