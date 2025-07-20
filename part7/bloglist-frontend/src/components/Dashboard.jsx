import { useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { createBlog, likeBlog, deleteBlog } from '../reducers/blogsReducer'


const Dashboard = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  )

  const blogFormRef = useRef()
  const user = useSelector(({ user }) => user)

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
  )
}

export default Dashboard