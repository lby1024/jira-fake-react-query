import useSWR from "swr"
import { useHttp } from "../http"
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
  const http = useHttp()
  return useSWR<UserType[]>('users', http)
}

export const useUser = () => {
  const http = useHttp()
  return useQuery({
    queryKey: [User.url.me],
    queryFn: ()=>http.get(User.url.me)
  })
}