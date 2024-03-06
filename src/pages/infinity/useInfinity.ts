import { useInfiniteQuery } from "@tanstack/react-query"
import { Studnet } from "../../model/Student"

export const useInfinityData = () => {
  const epics = useInfiniteQuery({
    queryKey: [Studnet.url.student],
    queryFn: (param) => Studnet.getStudents(param.pageParam, 9),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.next,
    getPreviousPageParam: firstPage => firstPage.prev
  })

  return epics
}