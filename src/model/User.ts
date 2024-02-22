import useSWR from "swr"
import { http } from "../http"
import { useQuery } from "@tanstack/react-query"

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

// export const useUser = () => {
//   return useQuery<UserType>({
//     queryKey: [User.url.me],
//     queryFn: ()=>http.get(User.url.me)
//   })
// }