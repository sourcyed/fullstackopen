import { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = (await axios.post('api/login', { username, password })).data
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
      popNotification('Login successful.', 'confirmation')
    } catch {
      popNotification('wrong username or password', 'error')
    }
  }

  const handleCreate = async (blog) => {
    try {
      const { data: newBlog } = await axios.post('api/blogs', blog)
      setBlogs((prev) => [...prev, newBlog].sort((a, b) => b.likes - a.likes))
      popNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added.`,
        'confirmation'
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      popNotification(error.message, 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    popNotification('Logout successful.', 'confirmation')
  }

  const popNotification = (message, type) => {
    const n = { message, type }
    setNotification(n)
    setTimeout(() => setNotification(null), 2000)
  }

  const onLike = async (blog) => {
    try {
      console.log(JSON.stringify(blog))
      const { data: updated } = await axios.put('api/blogs/' + blog.id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
      const newBlog = { ...updated, user: blog.user }
      console.log(JSON.stringify(newBlog))
      setBlogs(
        blogs
          .map((b) => (b.id !== blog.id ? b : newBlog))
          .sort((a, b) => b.likes - a.likes)
      )
      popNotification('Blog liked.', 'confirmation')
    } catch (error) {
      popNotification(error.message, 'error')
    }
  }

  const onDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await axios.delete('api/blogs/' + blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        popNotification('Blog deleted.', 'confirmation')
      } catch (error) {
        popNotification(error.message, 'error')
      }
    }
  }

  return (
    <div>
      <Notification notification={notification} />

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

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
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
          </div>
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
