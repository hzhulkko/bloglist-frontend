import axios from 'axios'
import header from '../helpers/header'

const baseUrl = '/api/blogs'
const config = {
  headers: header.authHeader()
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  console.log(response)
  return response.data
}

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return response.data
}

export default { getAll, create, update, remove, addComment }