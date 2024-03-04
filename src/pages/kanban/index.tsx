import { useProject, useProjectIdInUrl } from "../../model/Project.use"

export const PageKanban = () => {
  const projectId = useProjectIdInUrl()
  const { data, isLoading } = useProject(projectId)

  if (isLoading) return <h1>loading...</h1>

  return <div>
    <h1>kanban</h1>
    <p>projectId: {data.id}</p>
    <p>name: {data.name}</p>
    <p>organization: {data.organization}</p>
  </div>
}