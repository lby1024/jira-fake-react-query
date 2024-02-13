import create from 'use-state-link'
import { useState } from 'react'
import { Api } from './api'

const useUser = create({
  id: undefined,
  nickName: undefined,
  token: undefined
})

export const useAuth = () => {
  const [user, setUser] = useUser()
  const [loading, setLoading] = useState(false)

  const regist = async (data: any) => {
    setLoading(true)
    const res = await Api.regist(data)
    setUser(res)
    setLoading(false)
  }

  return { user, regist, loading }
}