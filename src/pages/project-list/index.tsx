import { Flex } from "antd"
import Header from "../../ui/Header"
import { ProjectTable } from "./ProjectTable"
import { Search } from "./search"
import { useTitle } from "../../tool/useTitle"

export const ProjectList = () => {
  useTitle('项目列表')
  
  return <Flex vertical gap='middle'>
    <Header/>
    <h1>项目列表</h1>
    <Search/>
    <ProjectTable/>
  </Flex>
}
