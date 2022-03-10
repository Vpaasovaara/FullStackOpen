import axios from 'axios'
const baseUrl = '/api/login'

const login = async newObj => {
  const request = axios.post(`${baseUrl}`, newObj)
  const response = await request
  return response.data
}


export default {
  login: login
}