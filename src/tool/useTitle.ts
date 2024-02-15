import { useEffect, useRef } from "react"

/**
 * 设置页面标题
 */
export const useTitle = (title: string) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
      document.title = title
  }, [title])

  useEffect(() => {
      return () => {
          document.title = defaultTitle.current
      }
  }, [])
}