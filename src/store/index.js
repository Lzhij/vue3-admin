import { readonly, reactive } from 'vue'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'

export const useStore = () => {
  const keys = { token: 'ADMIN_TOKEN', userInfo: 'ADMIN_USERINFO' }
  const state = reactive({ token: '', userInfo: null })

  const token = getStorage(keys.token)
  if (token) state.token = token

  const userInfo = getStorage(keys.userInfo)
  if (userInfo) state.userInfo = userInfo

  const updateToken = (value) => {
    state.token = value
    setStorage(keys.token, value)
  }

  const clearToken = () => {
    state.token = ''
    state.userInfo = {}
    removeStorage(keys.userInfo)
    removeStorage(keys.token)
  }

  const updateUserInfo = (value) => {
    state.userInfo = value
    setStorage(keys.userInfo, value)
  }

  return { state: readonly(state), updateToken, updateUserInfo, clearToken }
}
