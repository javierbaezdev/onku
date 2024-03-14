import axios from 'axios'
import { BASE_URL_API } from '@/shared/constants/general'

const Axios = axios.create({
  baseURL: BASE_URL_API,
  timeout: 30000,
  maxBodyLength: 10000000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

Axios.defaults.headers.common['Content-Type'] = 'application/json'

export default Axios
