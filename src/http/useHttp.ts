import { useState } from "react"

type reqState = 'idle' | 'loading' | 'success' | 'error'

type FnPromise<T> = (...arg: any[]) => Promise<T>

type Config = {
  enabled: boolean
  data?: any
}

const defaultConfig: Config = {
  enabled: true, // 为false时不会自动发请求
}

export const useHttp = <T>(callback: FnPromise<T>, config: Config = defaultConfig) => {
  const [data, setData] = useState<T>(null)
  const [error, setErr] = useState<Error>(null)
  const [state, setState] = useState<reqState>('idle')

  async function run(cb: FnPromise<T>, data?: any) {
    setState('loading')
    try {
      const res = await cb(data)
      setData(res)
      setState('success')
      return res
    } catch (error) {
      setErr(error as any)
      setState('error')
      throw error
    }
  }

  async function refetch(data?: any) {
    return await run(callback, data)
  }

  if (state === 'idle' && config.enabled) {
    run(callback, config.data)
  }

  return {
    data,
    error,
    state,
    run,
    refetch
  }
}