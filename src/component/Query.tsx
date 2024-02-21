import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { useAuth } from "../model/Auth";

interface QueryProps {
  children: any
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
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