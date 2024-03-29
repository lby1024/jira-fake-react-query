import { useInfiniteQuery } from "@tanstack/react-query"
import { http } from "../http"

type PageInput = {
  pageNumber?: number
  limit?: number
}

type PageOutPut = {
  next: number,
  prev: number,
  list: EpicType[]
}

type EpicType = {
  id: string
}

export class Epic {
  static url = {
    epic: 'epic'
  }

  static getEpics({ pageParam = 1 }) {
    const data: PageInput = {
      pageNumber: pageParam,
      limit: 9
    }
    return http.get<PageInput, PageOutPut>(`${Epic.url.epic}`, { data })
  }
}
