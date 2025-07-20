import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Blog from './components/Blog'
import axios from 'axios'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import {
  createBlog,
  initializeBlogs,
  likeBlog,
  deleteBlog
} from './reducers/blogsReducer'
import { loginUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(({ user }) => user)
  if (user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await dispatch(loginUser(username, password))
      popNotification('Login successful.', 'confirmation')
    } catch {
      popNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = async () => {
    dispatch(logout())
    popNotification('Logout successful.', 'confirmation')
  }

  const popNotification = (message, type) => {
    const n = { message, type }
    dispatch(addNotification(n, 5))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Notification />

      {user ? (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Menu />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold">Blogs</h2>
            <div className="text-sm text-gray-700">
              <span className="mr-4">
                Logged in as <strong>{user.username}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded"
              >
                Logout
              </button>
            </div>
          </div>

          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen px-4">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      )}
    </div>
  )
}

export default App
