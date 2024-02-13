import create from 'use-state-link'
import { useState } from 'react'
import { Api } from './api'
import { message } from 'antd'

type User = {
  id?: number
  nickName?: string
  token?: string
}

const useUser = create<User|null>(null)

export const useAuth = () => {
  const [user, setUser] = useUser()
  const [loading, setLoading] = useState(false)

  const regist = async (data: any) => {
    setLoading(true)
    return Api.regist(data)
      .then(res => setUser(res))
      .finally(() => setLoading(false))
  }

  const login = async (data: any) => {
    setLoading(true)
    return Api.login(data)
      .then(res => setUser(res))
      .finally(() => setLoading(false))
  }

  const logout = () => setUser(null)

  return { user, loading, regist, logout, login }
}