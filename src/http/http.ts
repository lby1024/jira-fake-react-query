import axios from "axios";
import * as qs from 'qs'
import {
  env,
  developmentBaseUrl,
  testBaseUrl,
  productionBaseUrl
} from "./config";
import { onErr } from "./error";
import { Auth } from "../model/Auth";

export function getBaseUrl() {
  if (env === "test") return testBaseUrl;
  if (env === "production") return productionBaseUrl;
  return developmentBaseUrl;
}

/**
 * 默认接口地址
 */
axios.defaults.baseURL = getBaseUrl();
/**
 * 请求超时时间
 */
axios.defaults.timeout = 1000 * 10;
/**
 * 请求的数据格式
 */
axios.defaults.headers["Content-Type"] = "application/json"
/**
 * 请求拦截
 * 请求前携带token
 */
axios.interceptors.request.use(
  // 请求前携带token
  (req) => {
    if (req.method === 'get' && req.data) {
      const params = qs.stringify(req.data)
      req.url += `?${params}`
    }
    let token = Auth.getToken()
    if (token && req.headers && typeof req.headers.set === "function") {
      req.headers.set("Authorization", `Bearer ${token}`);
    }
    return req;
  },
  // 发送请求失败走这里
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  (res) => res.data, // errCode以2开头走这里,例如200
  onErr // errCode以4,5开头走这里,例如404, 500
);

export const http = axios
