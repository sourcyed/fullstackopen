import { useState } from 'react'
import { useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  if (!blog) return <h2 className="text-center text-xl mt-10">Blog not found</h2>

  const onLike = async () => {
    try {
      await dispatch(likeBlog(blog))
      popNotification('Blog liked.', 'confirmation')
    } catch (error) {
      popNotification(error.message, 'error')
    }
  }

  const onDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(deleteBlog(blog))
        popNotification('Blog deleted.', 'confirmation')
      } catch (error) {
        popNotification(error.message, 'error')
      }
    }
  }

  const onComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    try {
      await dispatch(commentBlog(blog, comment))
      popNotification('Comment added.', 'confirmation')
      event.target.reset()
    } catch (error) {
      popNotification(error.message, 'error')
    }
  }

  const popNotification = (message, type) => {
    const n = { message, type }
    dispatch(addNotification(n, 5))
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Author:</span> {blog.author}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">URL:</span>{' '}
        <a
          href={blog.url}
          className="text-blue-600 hover:underline break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {blog.url}
        </a>
      </p>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-gray-700">Likes: {blog.likes}</span>
        <button
          onClick={onLike}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Like
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Added by <strong>{blog.user.username}</strong>
      </p>

      {user.username === blog.user.username && (
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mb-6"
        >
          Remove
        </button>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <form onSubmit={onComment} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            name="comment"
            placeholder="Write a comment..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Comment
          </button>
        </form>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {blog.comments.map((comment, index) => (
            <li key={`${blog.id}/comments/${index}`}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
