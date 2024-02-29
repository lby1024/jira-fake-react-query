import { UserType, useUsers } from "./User"
import { useMemo } from "react"
import { http } from "../http"
import { useQuery } from "@tanstack/react-query"
import { useUrlParams } from "../tool/useUrlParams"
import { cleanObj } from "../tool"

export type ProjectType = {
  id?: number,
  name?: string,
  personId?: number,
  organization?: string
}

type SearchParam = {
  name?: string
  personId?: number
}

export class Project {
  static url = {
    projects: 'projects'
  }

  static getProjects(data: UserType) {

    return http.get<UserType, ProjectType[]>(
      Project.url.projects,
      { data }
    )
  }
}

export const useProjects = (param: SearchParam) => {
  const data = cleanObj(param)

  return useQuery({
    queryKey: [Project.url.projects, data],
    queryFn: () => Project.getProjects(data)

  })
}
/**
 * table表单需要的数据
 */
export const useProjectsUsers = (param: UserType) => {
  const projects = useProjects(param)
  const users = useUsers()

  const data = useMemo(() => {
    if (projects.data && users.data) {
      return projects.data.map(project => {
        const person = users.data?.find(user => user.id === project.personId)
        const personName = person?.name
        return { ...project, personName, key: project.id }
      })
    }
    return undefined
  }, [projects.data, users.data])

  return {
    isloading: projects.isLoading || projects.isLoading,
    error: projects.error || users.error || null,
    data,
  }
}

