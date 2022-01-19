import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useLoading } from './useToggle'

/**
 *
 * @param {function} callback 请求函数
 * @param {boolean} onSend 是否一开始就发起一次
 * @returns {object} data: 请求回的数据 getData: 获取数据的方法
 */
export const useLoadingRequest = (callback = () => {}, onSend = true, queryParams = {}) => {
  const data = ref({})

  const { loading, setLoading } = useLoading()

  const hide = message.loading('加载中...', 0)

  const getData = async (query = {}) => {
    setLoading(true)
    let params = {}
    if (Object.keys(query).length) {
      params = query
    } else {
      const { current: page, pageSize: size } = queryParams
      params = { page, size }
    }
    try {
      const res = await callback(params)
      const { total } = res
      total && (queryParams.total = total)
      data.value = res
    } finally {
      setLoading(false)
      hide()
    }
  }

  onSend && getData()

  return {
    data,
    getData,
    loading
  }
}
