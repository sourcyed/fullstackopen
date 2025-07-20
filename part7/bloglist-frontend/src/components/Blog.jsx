import { useState } from 'react'
import { useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null
  if (!blog) return <h2>Blog not found</h2>


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
    <div
      className="blog"
      style={{
        border: '1px solid black',
        margin: '10px 10px 10px 10px',
        padding: '10px 10px 10px 10px',
      }}
    >
      <p>
        Title: {blog.title}{' '}
      </p>
      <div>
        <p>
          URL: {blog.url} <button onClick={(_) => onLike(blog)}>like</button>
        </p>
        <p>likes {blog.likes}</p>
        <p>Author: {blog.author}</p>
        <p>added by {blog.user.username}</p>
        <p>
          {user.username === blog.user.username ? (
            <button onClick={(_) => onDelete(blog)}>remove</button>
          ) : (
            ''
          )}
        </p>
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={`${blog.id}/comments/${index}`}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog
