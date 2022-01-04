import request from '@/utils/request.js'

function useApi(url) {
  const apiFactory = {}
  apiFactory.get = (query, id) => request.get(url + (id ?? `/${id}`), { params: query })
  apiFactory.post = (data) => request.post(url, data)
  apiFactory.put = (data, id) => request.put(url + (id ?? `/${id}`), data)
  apiFactory.delete = (id) => request.delete(url + `/${id}`)
  apiFactory.patch = (data, id) => request.patch(url + (id ?? `/${id}`), data)
  return apiFactory
}

export { useApi }
