import { Button, Flex } from "antd"
import { ProjectTable } from "./ProjectTable"
import { useTitle } from "../../tool/useTitle"
import { Search } from "./Search"
import styled from "styled-components"
import { Pop } from "../../component/Pop"

export const ProjectList = () => {
  useTitle('项目列表')

  const createProject = () => {
    Pop.open.project({ type: 'create' })
  }

  const Title = <Flex align="center" justify="space-between" >
    <h1>项目列表</h1>
    <Button type='link' onClick={createProject} >创建项目</Button>
  </Flex>

  return <Content vertical gap='middle'>
    {Title}
    <Search />
    <ProjectTable />
  </Content>
}

const Content = styled(Flex)`
  padding: 30px;
`
