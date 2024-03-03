import { UserType } from "./User"
import { http } from "../http"

export type ProjectType = {
  id?: number,
  name?: string,
  personId?: number,
  organization?: string
  pin?: boolean
}

export type SearchParam = {
  name?: string
  personId?: number
}

export class Project {
  static url = {
    project: 'project',
  }

  static createProjects(data: ProjectType) {
    return http.post<ProjectType, ProjectType>(
      Project.url.project,
      data
    )
  }

  static deleteProject(id: number) {
    return http.delete<ProjectType, ProjectType>(
      `${Project.url.project}/${id}`
    )
  }

  static updateProject(
    { id, data }: { id: number, data: ProjectType }
  ) {
    return http.patch<ProjectType, ProjectType>(
      `${Project.url.project}/${id}`,
      data
    )
  }

  static getProjects(data: UserType) {
    return http.get<UserType, ProjectType[]>(
      Project.url.project,
      { data }
    )
  }
}
