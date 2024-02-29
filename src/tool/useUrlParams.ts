import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObj } from ".";
/**
 * Param<'name'|'id'>
 * 相当于
 * {
 *   name: string
 *   id: string
 * }
 */
type Param<K extends string> = { [X in K]: string }

export function useUrlParams<K extends string>(...keys: K[]) {
  const [p, setP] = useSearchParams()

  const params: Param<K> = useMemo(() => {
    // 数组转对象
    return keys.reduce((res, key) => {
      const v = p.get(key)
      if (v) res[key] = v
      return res
    }, {} as any)
  }, [p])

  const setParams = (param: Partial<Param<K>>) => {
    /**
     * cleanObj的作用:
     * 将 api/projects?id=&name=jack 变成 api/projects?name=jack
     * 将 api/projects?name=&id=1 变成 api/projects?id=1
     * 将 api/projects?name=&id= 变成 api/projects
     */
    param = cleanObj({
      ...Object.fromEntries(p),
      ...param
    })
    setP(param)
  }

  return [
    params,
    setParams
  ] as const
}