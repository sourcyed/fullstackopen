import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Blog from './components/Blog'
import axios from 'axios'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogsReducer'
import { loginUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Users from './components/Users'
import User from './components/User'
import Dashboard from './components/Dashboard'

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
    <div>
      <Notification />

      {user ? (
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in</p>
          <p>
            <button
              onClick={() => {
                handleLogout()
              }}
            >
              logout
            </button>
          </p>

          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>

        </div>
      ) : (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  )
}

export default App
