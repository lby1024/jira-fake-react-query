export const resetRoute = () => {
  window.location.href = window.location.origin
}

export const sleep = (time = 1000) => new Promise(reso => {

  const timer = setTimeout(() => {
    reso(true)
    clearTimeout(timer)
  }, time)
})


/**
 * 是否为 null, undefined, '', 等
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
/**
 * {a: 0, b: null} --> {a: 0}
 */
export const cleanObj = <O extends object>(obj?: O) => {
  if (!obj) {
    return {}
  }
  const res: any = { ...obj }
  Object.keys(res).forEach(key => {
    const v = res[key]
    if (isFalsy(v)) {
      delete res[key]
    }
  })

  return res as Partial<O>
}