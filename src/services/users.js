import axios from 'axios'
import header from '../helpers/header'

const baseUrl = '/api/users'

const getAll = async () => {
  const config = {
    headers: header.authHeader()
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getAll }
