import axios from 'axios'

const getAll = async () => {
  const request = axios.get('/api/users/')
  const response = await request
  const user = response.data
  return user
}

const login = async (username, password) => {
  const request = axios.post('/api/login/', { username, password })
  const response = await request
  const user = response.data
  return user
}

export default { login, getAll }
