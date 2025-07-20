import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form
      onSubmit={addBlog}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create New Blog</h2>

      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write title here"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="author" className="text-sm text-gray-700 mb-1">
          Author
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Write author here"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="url" className="text-sm text-gray-700 mb-1">
          URL
        </label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Write URL here"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <input
          type="submit"
          value="Create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer transition"
        />
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
}

export default BlogForm
