import { useMemo } from "react"
import req from "./http"
import useSWR from "swr"

type User = {
  id: number,
  name: string
}

export const useUsers = () => {
  return useSWR<User[]>('users', req)
}

type Project = {
  id: number,
  name: string,
  personId: number,
  organization: string
}

export const useProjects = () => {
  return useSWR<Project[]>('projects', req)
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
    ...projects,
    data
  }
}
