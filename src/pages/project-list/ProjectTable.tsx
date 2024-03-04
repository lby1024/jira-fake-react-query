import { Button, Checkbox, Table } from "antd"
import dayjs from "dayjs";
import { useUrlParams } from "../../tool/useUrlParams";
import { useDebounce } from "../../tool/useDebounce";
import More from "./More";
import { ProjectType } from "../../model/Project";
import { useProjectsUsers, useUpdateProject } from "../../model/Project.use";
import { useNavigate } from "react-router-dom";

export const ProjectTable = () => {
  const [param] = useUrlParams('name', 'personId')
  const paramDelay = useDebounce(param)
  const { data, isloading } = useProjectsUsers(paramDelay)
  const updataProject = useUpdateProject()
  const navigate = useNavigate()

  const onSave = (id: number, checked: boolean) => {
    const data = { pin: checked }
    updataProject.mutate({ id, data })
  }

  const navTo = (project: ProjectType) => {
    navigate(`/projects/${project.id}/kanban`)
  }

  const columns = [
    {
      title: <Checkbox checked={true} />,
      dataIndex: 'pin',
      key: 'pin',
      render: (v: boolean, project: ProjectType) => <Checkbox checked={v} onChange={e => onSave(project.id, e.target.checked)} />
    }, {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, project: ProjectType) => <Button type="link" onClick={() => navTo(project)} >{name}</Button>
    }, {
      title: '部门',
      dataIndex: 'organization',
      key: 'organization'
    }, {
      title: '负责人',
      dataIndex: 'personName',
      key: 'personName'
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      render: (v: number) => dayjs(v).format('YYYY-MM-DD')
    }, {
      title: '编辑',
      render: (_: any, project: ProjectType) => <More project={project} />
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isloading}
      pagination={false}
    />
  )
}
