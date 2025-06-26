import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({handleCreate}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({title, author, url})

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={ addBlog }>
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
  )
}

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
}

export default BlogForm