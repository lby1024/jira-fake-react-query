type Env = "development" | "production" | "test";

export type Err = {
  message: string
  code: number
}
export const env: Env = "development";
export const testBaseUrl = "https://test..."; //测试环境
export const productionBaseUrl = "https://production..."; //生产环境
export const developmentBaseUrl = "http://localhost:3000/api"; //开发环境

