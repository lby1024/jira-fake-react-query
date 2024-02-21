import { Flex } from "antd"
import { ProjectTable } from "./ProjectTable"
import { Search } from "./search"
import { useTitle } from "../../tool/useTitle"

export const ProjectList = () => {
  useTitle('项目列表')
  
  return <Flex vertical gap='middle'>
    <h1>项目列表</h1>
    {/* <Search/>
    <ProjectTable/> */}
  </Flex>
}
