import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className="bg-gray-100 px-4 py-3 rounded-md mb-6 shadow-sm">
      <div className="flex space-x-6 text-blue-600 font-medium">
        <Link
          to="/"
          className="hover:underline hover:text-blue-800 transition"
        >
          Blogs
        </Link>
        <Link
          to="/users"
          className="hover:underline hover:text-blue-800 transition"
        >
          Users
        </Link>
      </div>
    </nav>
  )
}

export default Menu
