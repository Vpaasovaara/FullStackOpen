import axios from 'axios'
const baseUrl = '/api/persons'


const create = async newObj => {
  const request = axios.post(baseUrl, newObj)
  const response = await request
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const delPerson = pointer => {
  return axios.delete(`${baseUrl}/${pointer}`)
}

const update = async (id, newObject) => {
  const request = axios
    .put(`${baseUrl}/${id}`, newObject)
    .catch(error => {
      console.log(error)
    })
  const response = await request
  return response.data
}

export default {
  create: create,
  getAll: getAll,
  delPerson: delPerson,
  update: update
}