import { useState } from "react"
import { http } from "../http"
import { User, UserType } from "./User"
import create from 'use-state-link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export class Auth {
  static tokenKey = 'accessToken'
  static url = {
    login: 'login',
    regist: 'regist'
  }

  static setToken(token: string) {
    window.localStorage.setItem(Auth.tokenKey, token || "");
  }

  static getToken() {
    return localStorage.getItem(Auth.tokenKey);
  }

  static async login(data: UserType) {
    const userInfo = await http.post<UserType, UserType>(Auth.url.login, data)
    Auth.setToken(userInfo.token)
    return userInfo
  }

  static async regist(data: UserType) {
    const userInfo = await http.post<UserType, UserType>(Auth.url.regist, data)
    Auth.setToken(userInfo.token)
    return userInfo
  }
}

export const useAuth = () => {
  const queryClient = useQueryClient()

  const user = useQuery({
    queryKey: [User.url.me],
    queryFn: () => http.get<any, UserType>(User.url.me)
  })

  const login = useMutation({
    mutationFn: Auth.login,
    onSuccess: (user) => queryClient.setQueryData([User.url.me], () => user)
  })
  
  const regist = useMutation({
    mutationFn: Auth.login,
    onSuccess: () => queryClient.invalidateQueries({queryKey: [User.url.me]})
  })

  const logout = () => {
    queryClient.clear()
    Auth.setToken('')
  }

  return {
    ...user,
    userInfo: user.data,
    submiting: login.isPending || regist.isPending,
    login: login.mutate,
    regist: regist.mutate,
    logout,
  }
}

export const useUserInfo = create<UserType>(null)
type AuthState = 'idle' | 'loading' | 'success' | 'error'

export const useAuth2 = () => {
  const [user, setUser] = useUserInfo()
  const [state, setState] = useState<AuthState>('idle')

  const login = (data: UserType) => {
    setState('loading')
    return Auth.login(data)
      .then(user => {
        setUser(user)
        setState('success')
      })
      .catch(() => setState('error'))
  }

  const regist = (data: UserType) => {
    setState('loading')
    return Auth.regist(data)
      .then(user => {
        setUser(user)
        setState('success')
      })
      .catch(() => setState('error'))
  }

  const getUserInfo = () => {
    setState('loading')
    return http.get(User.url.me)
      .then(user => {
        setUser(user)
        setState('success')
      })
      .catch(()=>setState('error'))
  }

  const logout = () => {
    setUser(null)
    Auth.setToken('')
  }

  return {
    user,
    state,
    login,
    regist,
    logout,
    getUserInfo,
  }
}


