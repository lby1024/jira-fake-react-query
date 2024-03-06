import { Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useInfinityData } from "./useInfinity";
import { Studnet } from "../../model/Student";

export const InfinityPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfinityData()
  const client = useQueryClient()

  function init() {
    client.setQueriesData({ queryKey: [Studnet.url.student] }, null)
    refetch()
  }


  if (isLoading) return <div>loading...</div>

  return <div>
    <Button onClick={() => init()} >刷新</Button>
    {
      data?.pages?.map(page => {
        return page.list.map(item => <h1 key={item.id} >{item.id}</h1>)
      })
    }
    <Button onClick={() => fetchNextPage()} disabled={hasNextPage === false} >get more</Button>
  </div>
}