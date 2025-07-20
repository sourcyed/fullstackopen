import { useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  )

  const blogFormRef = useRef()

  const handleCreate = async (blog) => {
    try {
      dispatch(createBlog(blog))
      popNotification(
        `A new blog "${blog.title}" by ${blog.author} added.`,
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
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
          <BlogForm handleCreate={handleCreate} />
        </Togglable>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border border-gray-200 rounded-lg px-4 py-3 bg-white hover:shadow-md transition-shadow"
          >
            <Link
              to={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline text-lg font-medium"
            >
              {blog.title}
            </Link>
            <p className="text-sm text-gray-500">by {blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
