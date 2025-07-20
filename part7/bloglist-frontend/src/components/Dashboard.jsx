import { useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { createBlog, likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'



const Dashboard = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  )

  const blogFormRef = useRef()

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

  const popNotification = (message, type) => {
    const n = { message, type }
    dispatch(addNotification(n, 5))
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>

      <div className="blogs">
        {blogs.map((blog) => (
          <p key={blog.id}>
            <Link  to={'blogs/' + blog.id}>{blog.title}</Link>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Dashboard