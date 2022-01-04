import { useStore } from '@/store'
import { message, Progress } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/404', '/login']

export const beforeEach = (to, from) => {
  NProgress.start()
  const {
    state: { userInfo }
  } = useStore()
  if (whiteList.includes(to.path)) {
    return true
  } else {
    if (userInfo) {
      return true
    } else {
      message.error('请先登录')
      return { name: 'login' }
    }
  }
}

export const afterEach = () => {
  NProgress.done()
}
