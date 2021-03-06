import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

/**
 *
 * @param {array} list 必传参数 列表数据
 * @return {array} treeList 树形数据
 */
export const transformTree = (list = [], root = '', parentKey = 'pid', key = 'id') => {
  const treeMap = {}
  list.forEach((item) => {
    const parentVal = item[parentKey]
    if (!treeMap[parentVal]) treeMap[parentVal] = []
    treeMap[parentVal].push(item)
  })
  list.forEach((item) => {
    if (treeMap[item.id]) {
      item.children = treeMap[item.id]
    }
  })
  return treeMap[root]
}

/**
 *
 * @param {string} str 日期字符串
 * @returns {string} 格式化后的日期
 */
export const formatDate = (str = '') => {
  const dStr = dayjs(str)
  return dStr.format('YYYY-MM-DD')
}

/**
 * 
 * @param {function} callback 请求函数
 * loading效果获取数据
 */
export const loadData = async(callback = () => {}) => {
  const hide = message.loading('加载中...', 0)
  const data = await callback()
  hide()
  return { data }
}
