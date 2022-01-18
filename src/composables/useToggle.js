import { ref, reactive } from 'vue'

/**
 * @params {boolean} loading 初始值  默认false
 * @returns {object} loading值和设置loading的函数
 */
export const useLoading = (b = false) => {
  const loading = ref(b)
  const setLoading = (flag = false) => {
    loading.value = flag
  }

  return {
    loading,
    setLoading
  }
}
