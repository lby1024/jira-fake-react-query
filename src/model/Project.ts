import { useUsers } from "./User"
import { useMemo } from "react"
import { http } from "../http"
import { useQuery } from "@tanstack/react-query"
import { useUrlParams } from "../tool/useUrlParams"

export type ProjectType = {
  id?: number,
  name?: string,
  personId?: number,
  organization?: string
}

export class Project {
  static url = {
    projects: 'projects'
  }
}

export const useProjects = () => {
  return useQuery({
    queryKey: [Project.url.projects],
    queryFn: () => http.get<any, ProjectType[]>(Project.url.projects)
  })
}
/**
 * table表单需要的数据
 */
export const useProjectsUsers = () => {
  const projects = useProjects()
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
