import req from '../http'

export class Api {
  
  static regist(data: any) {
    return req.post('regist', data)
  }

  static login(data: any) {
    return req.post('login', data)
  }
}