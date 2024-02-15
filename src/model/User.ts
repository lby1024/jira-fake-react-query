import useSWR from "swr"
import { http } from "../http"

export type UserType = {
  id?: number,
  name?: string,
  nickName?: string,
  token?: string
}

export class User {

  static regist(data: any) {
    return http.post('regist', data)
  }

  static login(data: any) {
    return http.post('login', data)
  }
}

export const useUsers = () => {
  return useSWR<UserType[]>('users', http)
}
