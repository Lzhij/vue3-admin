export const employmentOptions = {
  unKnow: '未知',
  official: '正式',
  unofficial: '非正式',
  filters(key) {
    switch (+key) {
      case 0:
        return this.unofficial
      case 1:
        return this.official
      default:
        return this.unofficial
    }
  }
}

export const useCheckTime = (t1 = '', t2 = '') => {
  const d1 = +new Date(t1)
  const d2 = +new Date(t2)
  return d1 > d2
}
