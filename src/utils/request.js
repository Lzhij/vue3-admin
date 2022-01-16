import axios from 'axios'
import { useStore } from '@/store'
import { message } from 'ant-design-vue'
import router from '../router'

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
  ({ data }) => {
    const { success, message: msg } = data
    if (!success) {
      message.error(msg)
      return Promise.reject(msg)
    }
    const result = data && data.data
    return result
  },
  ({ response }) => {
    const { status, data } = response
    const msg = (data && data.message) || '操作失败请稍后重试'
    console.log(router)
    switch (status) {
      case 401:
        message.error(msg)
        router.push({ name: 'login' })
        return Promise.reject(msg)
      default:
        message.error(msg)
        return Promise.reject(data)
    }
  }
)

export default serve
