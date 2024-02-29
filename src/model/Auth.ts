import { http } from "../http"
import { User, UserType, useUserInfo } from "./User"
import { useHttp } from "../http/useHttp";

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

  static logout: Function // useAuth执行时会被赋值
}

export const useAuth = () => {
  const [userInfo, setUser] = useUserInfo()
  const { state, run, refetch } = useHttp(User.getInfo, { enabled: false })

  const login = async (data: UserType) => {
    const user = await run(Auth.login, data)

    setUser(user)
  }

  const regist = async (data: UserType) => {
    const user = await run(Auth.regist, data)
    setUser(user)
  }

  const getUserInfo = async () => {
    const user = await refetch()
    console.log(user, 'xxxxx');
    setUser(user)
  }

  Auth.logout = () => {
    setUser(null)
    Auth.setToken('')
  }

  return {
    userInfo,
    state,
    login,
    regist,
    logout: Auth.logout,
    getUserInfo,
  }
}


// export const useAuth = () => {
//   const queryClient = useQueryClient()
//   const user = useUser()

//   const login = useMutation({
//     mutationFn: Auth.login,
//     onSuccess: () => user.refetch(), // 登录成功后,重新获取userInfo
//     onError: (err) => { Pop.error(err.message) }
//   })

//   const regist = useMutation({
//     mutationFn: Auth.regist,
//     onSuccess: (user) => queryClient.setQueryData([User.url.me], user), // 注册成功后,修改本地缓存
//     onError: (err) => { Pop.error(err.message) },
//   })

//   Auth.logout = () => {
//     queryClient.setQueryData([User.url.me], null)
//     queryClient.clear() // clear数据清空后,视图并不会响应,所有上面要用setQueryData
//     Auth.setToken('')
//   }

//   return {
//     ...user,
//     userInfo: user.data,
//     submiting: login.isPending || regist.isPending,
//     login: login.mutate,
//     regist: regist.mutate,
//     logout: Auth.logout,
//   }
// }
