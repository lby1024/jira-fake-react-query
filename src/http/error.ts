import { AxiosResponse } from "axios";
import { Auth } from "../model/Auth";
/**
 * 收到server错误信息后执行这个函数
 */
function resolveRes(response: AxiosResponse) {
  if (response.status === 401) {
    Auth.logout()
    // 未登录,跳转到登录页面
  }
  if (response.status === 403) {
    // token过期,跳转到登录页面或者刷新token重新发送请求
    // refetch(response);
  }
  if (response.status === 404) {
    // 找不到地址,跳转到404页面
  }
  return Promise.reject(response.data)
}
/**
 * 断网了, 服务器崩溃了执行这个函数
 */
function noRes(err: any) {
  if (!window.navigator.onLine) {
    // 断网的处理: 一般就跳转到断网页面
    return;
  }
  return Promise.reject(err);
}
/**
 * errCode以4,5触发函数,例如404, 500
 */
export const onErr = (err: any) => {
  const { response } = err;
  // 服务器返回了错误信息, 执行resolveRes()
  if (response) return resolveRes(response);
  // 断网了, 服务器崩溃了, 执行noRes()
  else return noRes(err);
}
