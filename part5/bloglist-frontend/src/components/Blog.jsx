import Togglable from './Togglable'

const Blog = ({ blog, onLike }) => {
  return (
    <div style={{ border: '1px solid black', margin: '10px 10px 10px 10px', padding: '10px 10px 10px 10px' }}>
      <p>
        {blog.title}
      </p>
      <Togglable buttonLabel='view'>
        <p>
          {blog.url} <button onClick={(event) => onLike(blog)}>like</button>
        </p>
        <p>
          likes {blog.likes}
        </p>
        <p>
          {blog.author}
        </p>
      </Togglable>
    </div>
  )
}

export default Blog