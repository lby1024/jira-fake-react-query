import { Button } from "antd";
import { useEpics, Epic } from "../../model/Epic"
import { useQueryClient } from "@tanstack/react-query";

export const EpicPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useEpics()
  const client = useQueryClient()

  function init() {
    client.setQueriesData({ queryKey: [Epic.url.epic] }, null)
    refetch()
  }


  if (isLoading) return <div>loading...</div>

  return <div>
    <Button type="link" onClick={() => init()} >Epic: 刷新</Button>
    {
      data?.pages?.map(page => {
        return page.list.map(item => <h1 key={item.id} >{item.id}</h1>)
      })
    }
    <Button onClick={() => fetchNextPage()} disabled={hasNextPage === false} >get more</Button>
  </div>
}