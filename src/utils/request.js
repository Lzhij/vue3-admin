import axios from 'axios'
import { useStore } from '@/store'
import { message } from 'ant-design-vue'

const serve = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000
})

serve.interceptors.request.use(
  (config) => {
    const { state } = useStore()
    if (state.token) {
      config.headers.Authorization = `Bearer ${state.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

serve.interceptors.response.use(
  (data) => {
    const result = data && data.data && data.data.data
    return result
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)

export default serve
