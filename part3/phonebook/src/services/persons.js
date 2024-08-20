import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons/'

const getAll = () => {
    const nonExisting = {
        id: 10000,
        name: 'This person is not saved to server',
        number: '0000'
    }
      
    return axios
      .get(baseUrl)
      .then(r => r.data.concat(nonExisting))
}

const create = person =>
    axios
      .post(baseUrl, person)
      .then(r => r.data)

const update = person =>
    axios
      .put(baseUrl + person.id, person)
      .then(r => r.data)

const del = id =>
    axios
      .delete(baseUrl + id)
      .then(r => r.data)


export default { getAll, create, update, del }