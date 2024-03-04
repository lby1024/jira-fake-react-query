import { Table } from "antd"
import dayjs from "dayjs";
import { useStudents } from "../../model/Student";

export const StudentPage = () => {
  const { list, paginationConfig, isloading } = useStudents(9)

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      render: (v: number) => dayjs(v).format('YYYY-MM-DD')
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={list}
      pagination={paginationConfig}
      loading={isloading}
    />
  )
}
