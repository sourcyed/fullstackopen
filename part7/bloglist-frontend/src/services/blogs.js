import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createNew = async (blog) => {
  const request = axios.post(baseUrl, blog)
  const response = await request
  return response.data
}

const likeBlog = async (blog) => {
  const request = axios.put(baseUrl + blog.id, {
    ...blog,
    likes: blog.likes + 1,
  })
  const response = await request
  return response.data
}

const deleteBlog = async (blog) => {
  const request = axios.delete(baseUrl + blog.id)
  const response = await request
  return response.data
}

export default { getAll, createNew, likeBlog, deleteBlog }
