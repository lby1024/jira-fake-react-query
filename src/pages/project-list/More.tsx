import { Button, Dropdown } from "antd"
import { FC } from "react"
import { Pop } from "../../component/Pop"
import { ProjectType } from "../../model/Project"
import { useDeleteProject } from "../../model/Project.use"

interface IMore {
  project: ProjectType
}

const More: FC<IMore> = ({ project }) => {
  const { id } = project
  const dele = useDeleteProject()

  const onClick = (e: any) => {
    if (e.key === 'update') {
      Pop.open.project({ type: 'update', projectId: id })
    }
    if (e.key === 'delete') {
      dele.mutate(id)
    }
  }

  return <Dropdown menu={{ items, onClick }}  >
    <Button type='link' >...</Button>
  </Dropdown>
}

export default More

const items = [
  {
    key: 'update',
    label: '编辑'
  }, {
    key: 'delete',
    label: '删除'
  }
]

