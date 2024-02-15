import { Button, Table } from "antd"
import { useAuth, useProjectsUsers } from "../../data";
import Header from "../../ui/Header";

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '负责人',
    dataIndex: 'personName',
    key: 'personName'
  }
]

export const List = () => {

  const projects = useProjectsUsers()
  const { logout } = useAuth()
  
  return <>
    <Table columns={columns} dataSource={projects.data} />
  </>
}