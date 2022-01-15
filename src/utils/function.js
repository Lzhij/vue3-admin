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
