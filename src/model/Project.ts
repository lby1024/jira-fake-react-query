import useSWR from "swr"
import { useUsers } from "./User"
import { useMemo } from "react"
import { http } from "../http"

export type ProjectType = {
  id?: number,
  name?: string,
  personId?: number,
  organization?: string
}


export const useProjects = () => {
  return useSWR<ProjectType[]>('projects', http)
}

export const useProjectsUsers = () => {
  const projects = useProjects()
  const users = useUsers()  

  const data = useMemo(() => {
    if (projects.data && users.data) {
      return projects.data.map(project => {
        const person = users.data?.find(user => user.id === project.personId)
        const personName = person?.name
        return {...project, personName, key: project.id}
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