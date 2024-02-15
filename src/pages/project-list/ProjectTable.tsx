import { Checkbox, Table } from "antd"
import dayjs from "dayjs";
import { useProjectsUsers } from "../../model/Project";

const columns = [
  {
    title: <Checkbox checked={true} />,
    dataIndex: 'pin',
    key: 'pin',
    render: () => <Checkbox checked={true} />
  },{
    title: '项目名称',
    dataIndex: 'name',
    key: 'name'
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
  }
]

export const ProjectTable = () => {

  const {data, error, isloading} = useProjectsUsers()
  
  return <>  
    
    <Table columns={columns} dataSource={data} loading={isloading} />
  </>
}