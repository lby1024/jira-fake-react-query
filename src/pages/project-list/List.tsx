import { Table } from "antd"
import { useProjectsUsers } from "../../data";

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
  console.log(projects.data);
  
  
  return <Table columns={columns} dataSource={projects.data} />
  // return <div>xx</div>
}