import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createNew = async (blog) => {
  const request = axios.post('api/blogs', blog)
  const response = await request
  return response.data
}

export default { getAll, createNew }
