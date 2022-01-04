export function getStorage(key = '') {
  const data = localStorage.getItem(`$${key}`)
  if (!data) return null
  return JSON.parse(data)
}

export function setStorage(key = '', value = {}) {
  if (!value) value = {}
  const data = JSON.stringify(value)
  localStorage.setItem(`$${key}`, data)
}

export function removeStorage(key = '') {
  localStorage.removeItem(`$${key}`)
}
