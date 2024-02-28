export const resetRoute = () => {
  window.location.href = window.location.origin
}

export const sleep = (time = 1000) => new Promise(reso => {

  const timer = setTimeout(() => {
    reso(true)
    clearTimeout(timer)
  }, time)
})

type Target = null | undefined | '' | 0

export const shuoldClean = (value: unknown, targets: Target[]) => {
  let clean = false
  if (value) return clean

  targets.every(item => {
    if (item === value) {
      clean = true
      return false  // 返回false表示退出循环
    }
    return true
  })

  return clean
}
/**
 * clean(obj, ['null', 'undefined']) 清除 value = null | undefined 的属性
 */
export const cleanObj = (
  obj: object,
  targets: Target[] = ['', 0, null, undefined]
) => {

  if (!obj) {
    return {}
  }

  const res: any = { ...obj }
  Object.keys(res).forEach(key => {
    const v = res[key]

    if (shuoldClean(v, targets)) {
      delete res[key]
    }
  })

  return res
}