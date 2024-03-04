import { useMemo, useState } from "react"
import { http } from "../http"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TablePaginationConfig } from "antd"


type PageInput = {
  pageNumber?: number
  limit?: number
}

type PageOutPut = {
  next: number,
  prev: number,
  total: number,
  list: StudnetType[]
}

type StudnetType = {
  id?: string
  name?: string
  age?: number
  created?: number
}

export class Studnet {
  static url = {
    student: 'student'
  }

  static getStudents(pageNumber: number, limit: number) {
    let data = {
      pageNumber: pageNumber || 1,
      limit
    }
    return http.get<PageInput, PageOutPut>(Studnet.url.student, { data })
  }
}

export function useStudents(limit: number = 9) {
  const [pageNumber, setPageNumber] = useState(1);

  const res = useQuery({
    queryKey: [Studnet.url.student, pageNumber],
    queryFn: () => Studnet.getStudents(pageNumber, limit),
    placeholderData: keepPreviousData, // 预加载
  });

  const list = useMemo(() => {
    let arr: StudnetType[] = []
    if (res.data && res.data.list) {
      arr = res.data.list.map(item => ({ ...item, key: item.id }))
    }
    return arr
  }, [res.data])

  const paginationConfig: TablePaginationConfig = {
    pageSize: limit,
    current: pageNumber,
    total: res?.data?.total,
    showSizeChanger: false,
    onChange: pageNumber => setPageNumber(pageNumber),
  }

  return {
    list,
    paginationConfig,
    isloading: res.isLoading,
  };
}