import request from '@/utils/request.js'

function useApi(url) {
  const apiFactory = {}
  const get = (query, id) => request.get(url + (id ? `/${id}` : ''), { params: query })
  const post = (data) => request.post(url, data)
  const put = (data, id) => request.put(url + (id ? `/${id}` : ''), data)
  const remove = (id) => request.delete(url + `/${id}`)
  const patch = (data, id) => request.patch(url + (id ? `/${id}` : ''), data)
  return {
    get,
    post,
    put,
    remove,
    patch
  }
}

export { useApi }
