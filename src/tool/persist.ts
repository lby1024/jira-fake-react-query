type Fn = (...arg: any[]) => any
type Api = {
  get: Fn
  set: Fn
}

export const persist = (key: string, initialData: any) => {

  const middleWare = (api: Api) => (next: Fn) => (value: any) => {
    next(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return {
    initialData: JSON.parse(localStorage.getItem(key) as any) || initialData,
    middleWare
  }
}