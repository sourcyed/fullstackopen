import { useState, useEffect, useRef } from 'react'
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

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(({ user }) => user)
  if (user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    console.log(`Bearer ${user.token}`)
  }
  const blogs = useSelector(({ blogs }) => [...blogs].sort((a, b) => b.likes - a.likes))

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await dispatch(loginUser(username, password))
      popNotification('Login successful.', 'confirmation')
    } catch {
      popNotification('wrong username or password', 'error')
    }
  }

  const handleCreate = async (blog) => {
    try {
      dispatch(createBlog(blog))
      popNotification(
        `a new blog ${blog.title} by ${blog.author} added.`,
        'confirmation'
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      popNotification(error.message, 'error')
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

  const onLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      popNotification('Blog liked.', 'confirmation')
    } catch (error) {
      popNotification(error.message, 'error')
    }
  }

  const onDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog))
        popNotification('Blog deleted.', 'confirmation')
      } catch (error) {
        popNotification(error.message, 'error')
      }
    }
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

          <Users />

          {/* <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm handleCreate={handleCreate} />
          </Togglable>

          <div className="blogs">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                onLike={onLike}
                user={user}
                onDelete={onDelete}
              />
            ))}
          </div> */}
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
