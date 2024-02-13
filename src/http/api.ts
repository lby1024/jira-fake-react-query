import req from './http'

export class Api {
  
  static regist(formData: any) {
    return req.post('regist', formData)
  }
}