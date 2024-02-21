import { useState } from "react"
import { useHttp } from "../http"
import { persist } from "../tool/persist"
import { UserType } from "./User"
import create, { applyMiddleWare } from 'use-state-link'

export class Auth {
  static tokenKey = 'accessToken'
  static url = {
    login: 'login',
    regist: 'regist'
  }
}

const { initialData, middleWare } = persist(Auth.tokenKey, '')

const useToken = create(
  initialData,
  applyMiddleWare(middleWare)
)

export const useAuth = () => {
  const [token, setToken] = useToken()
  const [loading, setLoading] = useState(false)
  const http = useHttp()

  const login = (data: UserType) => {
    setLoading(true)
    return http.post<UserType, UserType>(Auth.url.login, data)
      .then(user => setToken(user.token))
      .finally(() => setLoading(false))
  }

  const regist = (data: UserType) => {
    setLoading(true)
    return http.post<UserType, UserType>(Auth.url.regist, data)
      .then(user => setToken(user.token))
      .finally(() => setLoading(false))
  }

  const logout = () => {
    setToken('')
  }

  return {
    token,
    login,
    regist,
    logout,
    loading,
  }
}
