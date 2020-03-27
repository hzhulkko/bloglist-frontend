import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: {Authorization : `Bearer ${token}`}
  }
  const response = await axios.post(baseUrl, blog, config)
  console.log('Got response:', response)
  return response.data
}

export default { getAll, create, setToken }