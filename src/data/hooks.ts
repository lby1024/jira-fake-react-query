import { useMemo } from "react"
import useSWR from "swr"
import { Project, User } from "../types"
import req from '../http'

export const useUsers = () => {
  return useSWR<User[]>('users', req)
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
    data
  }
}

