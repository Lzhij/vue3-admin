import axios from 'axios'
import { useStore } from '@/store'
import { message } from 'ant-design-vue'

let hide = null

const serve = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000
})

serve.interceptors.request.use(
  (config) => {
    !hide && (hide = message.loading('加载中...', 0))
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
    hide() && (hide = null)
    return result
  },
  (err) => {
    hide() && (hide = null)
    return Promise.reject(err)
  }
)

export default serve
