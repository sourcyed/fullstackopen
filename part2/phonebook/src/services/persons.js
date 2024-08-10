import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => 
    axios
      .get(baseUrl)
      .then(r => r.data)

const create = person =>
    axios
      .post(baseUrl, person)
      .then(r => r.data)

export default { getAll, create }