import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Project, ProjectType, SearchParam } from "./Project"
import { http } from "../http"
import { cleanObj } from "../tool"
import { UserType, useUsers } from "./User"
import { useMemo } from "react"
import { Pop } from "../component/Pop"
import { useLocation } from "react-router-dom"

export const useCreateProject = () => {
  const client = useQueryClient()

  const onSuccess = () => {
    Pop.close.project()
    client.invalidateQueries({
      queryKey: [Project.url.project]
    })
  }
  return useMutation({
    mutationFn: Project.createProjects,
    onSuccess,
    onError: (err) => Pop.open.error(err.message)
  })
}

export const useDeleteProject = () => {
  const client = useQueryClient()

  const onSuccess = () => {
    Pop.open.success('删除成功')
    client.invalidateQueries({
      queryKey: [Project.url.project]
    })
  }

  function onMutate(projectId: number) {
    const oldData = client.getQueriesData<ProjectType[]>({ queryKey: [Project.url.project] });
    const oldProjects = oldData[0][1]
    const res = oldProjects.filter(item => item.id !== projectId)
    client.setQueriesData<ProjectType[]>({ queryKey: [Project.url.project] }, res);
    return oldProjects
  }

  function onError(err: any, _: any, oldProjects: any) {
    Pop.open.error(err.message)
    client.setQueriesData<ProjectType[]>({ queryKey: [Project.url.project] }, oldProjects);
  }

  return useMutation({
    onMutate,
    mutationFn: Project.deleteProject,
    onSuccess,
    onError
  })
}

export const useUpdateProject = () => {
  const client = useQueryClient()

  const onSuccess = () => {
    Pop.close.project()
    client.invalidateQueries({ queryKey: [Project.url.project] })
  }

  function onMutate(
    { id, data }: { id: number, data: ProjectType }
  ) {
    const oldData = client.getQueriesData<ProjectType[]>({ queryKey: [Project.url.project] });
    const oldProjects = oldData[0][1]
    const res = oldProjects.map(item => {
      if (item.id === id) return { ...item, ...data }
      return item
    })
    client.setQueriesData<ProjectType[]>({ queryKey: [Project.url.project] }, res);
    return oldProjects
  }

  function onError(err: any, _: any, oldProjects: any) {
    Pop.open.error(err.message)
    client.setQueriesData<ProjectType[]>({ queryKey: [Project.url.project] }, oldProjects);
  }

  return useMutation({
    onMutate,
    mutationFn: Project.updateProject,
    onSuccess,
    onError
  })
}

export const useProject = (projectId: number) => {
  const url = `${Project.url.project}/${projectId}`
  return useQuery({
    queryKey: [url],
    queryFn: () => http.get<any, ProjectType>(url),
    enabled: projectId ? true : false
  })
}

export const useProjects = (param: SearchParam) => {
  const data = cleanObj(param)

  return useQuery({
    queryKey: [Project.url.project, data],
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
        const personName = person?.name || '未知'
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

export function useProjectIdInUrl() {
  const { pathname } = useLocation()
  const id = pathname.match(/\/projects\/(\d+)\/kanban/)?.[1]
  return Number(id)
}
