import create from 'use-state-link'
import { Api } from '../http'

const useUser = create({
  id: undefined,
  nickName: undefined,
  token: undefined
})

export const useAuth = () => {
  const [user, setUser] = useUser()

  const regist = (data: any) => {
    Api.regist(data).then(user => {
      setUser(user)
    })
  }

  return { user, regist }
}