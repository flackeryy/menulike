import axios from 'axios'
import { API_URL } from '../config'

const instance = axios.create({
  baseURL: API_URL,
  responseType: 'json'
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

export default instance
