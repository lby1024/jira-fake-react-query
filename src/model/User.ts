import useSWR from "swr"
import { http } from "../http"
import { useQuery } from "@tanstack/react-query"
import { useMounted } from "../tool/useMounted"

export type UserType = {
  id?: number,
  name?: string,
  nickName?: string,
  token?: string
}

export class User {

  static url = {
    me: 'me',
    users: 'users'
  }

}

export const useUsers = () => {
  return useSWR<UserType[]>('users', http)
}

export const useUser = () => {
  const user = useQuery<UserType>({
    queryKey: [User.url.me],
    queryFn: () => http.get(User.url.me),
    enabled: false, // 取消自动发送请求
  })

  /**
   * 自动获取用户信息只执行一次
   */
  useMounted(() => {
    if (user.isFetched === false) {
      user.refetch()
    }
  })

  return user
}