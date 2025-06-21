import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    } catch {
      window.alert('Invalid credentials!')
    }
  }

  return (
    user ?
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <p>
        <button onClick={() => { window.localStorage.removeItem('loggedUser'); setUser(null); }}>logout</button>
      </p>
    </div> :
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
  )
}

export default App