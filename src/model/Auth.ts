import { persist } from "../tool/persist"
import create, { applyMiddleWare } from 'use-state-link'
import { useState } from "react"
import { User, UserType } from "./User"

// 强缓存
const {initialData, middleWare} = persist('user', null)

const useUser = create<UserType|null>(initialData, applyMiddleWare(middleWare))

export const useAuth = () => {
  const [user, setUser] = useUser()
  const [loading, setLoading] = useState(false)

  const regist = async (data: any) => {
    setLoading(true)
    return User.regist(data)
      .then(res => setUser(res))
      .finally(() => setLoading(false))
  }

  const login = async (data: any) => {
    setLoading(true)
    return User.login(data)
      .then(res => setUser(res))
      .finally(() => setLoading(false))
  }

  const logout = () => setUser(null)

  return { user, loading, regist, logout, login }
}
