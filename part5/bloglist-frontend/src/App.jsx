import { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = (await axios.post('api/login', {username, password})).data
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      popNotification('Login successful.', 'confirmation')
    } catch {
      popNotification('wrong username or password', 'error')
    }
  }

  const handleCreate = async e => {
    e.preventDefault()

    try {
      const blog = { title, author, url }
      const { data: newBlog } = await axios.post('api/blogs', blog, {headers: { Authorization: `Bearer ${user.token}`}})
      setBlogs([...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      popNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'confirmation')
    } catch (error) {
      popNotification(error.message, 'error')
    }
  }

  const handleLogout = async setUser => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    popNotification('Logout successful.', 'confirmation')
  }

  const popNotification = (message, type) => {
    const n = { message, type }
    setNotification(n)
    setTimeout(() => setNotification(null) , 2000)
  }


  return (
    <div>
      <Notification notification={notification} />

      {user ?
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in</p>
          <p>
            <button onClick={() => { handleLogout(setUser) }}>logout</button>
          </p>

          <form onSubmit={handleCreate}>
            <p>
              title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </p>
            <p>
              author: <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
            </p>
            <p>
              url: <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
            </p>
            <p>
              <input type="submit" value="create" />
            </p>
          </form>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        :
        <div>
          <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <p>
              username
              <input type="text" value={username} onChange={e => setUsername(e.currentTarget.value)} />
            </p>
            <p>
              password
              <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
            </p>
            <p>
              <input type="submit" value="login" />
            </p>
          </form>
        </div>
      }

    </div>
  )
}

export default App


