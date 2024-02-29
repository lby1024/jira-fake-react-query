import { http } from "../http"
import { useQuery } from "@tanstack/react-query"
import create from 'use-state-link'

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

  static getInfo() {
    return http.get<any, UserType>(User.url.me)
  }
}

export const useUsers = () => {
  return useQuery<UserType[]>({
    queryKey: [User.url.users],
    queryFn: () => http.get(User.url.users),
    enabled: false
  })
}

export const useUserInfo = create<UserType>(null)
// export const useUser = () => {
//   const user = useQuery<UserType>({
//     queryKey: [User.url.me],
//     queryFn: () => http.get(User.url.me),
//     enabled: false, // 取消自动发送请求
//   })

//   return user
// }