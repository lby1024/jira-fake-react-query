import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

interface QueryProps {
  children: any
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // 失败重试次数 默认 3次
      refetchOnWindowFocus: false,  // 窗口重新获得焦点时重新获取数据
      staleTime: 1000 * 60 * 60, // 数据保鲜期
    }
  }
});

export const Query: FC<QueryProps> = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}