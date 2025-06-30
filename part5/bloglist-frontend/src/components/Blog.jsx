import { useState } from 'react'

const Blog = ({ blog, onLike, user, onDelete }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='blog' style={{ border: '1px solid black', margin: '10px 10px 10px 10px', padding: '10px 10px 10px 10px' }}>
      <p>
        {blog.title} <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
      </p>
      <div style={{ display: expanded ? '' : 'none' }}>
        <p>
          {blog.url} <button onClick={ (_) => onLike(blog) }>like</button>
        </p>
        <p>
          likes {blog.likes}
        </p>
        <p>
          {blog.author}
        </p>
        <p>
          {
            user.username === blog.user.username ?
              <button onClick={(_) => onDelete(blog) }>remove</button>
              :
              ''
          }
        </p>
      </div>
    </div>
  )
}

export default Blog