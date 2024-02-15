import { Flex } from "antd"
import styled from "styled-components"

export const Page404 = () => {
  return <MyFlex vertical justify="center" align="center">
    <h1>404 :)</h1>
  </MyFlex>
}

const MyFlex = styled(Flex)`
  width: 100vw;
  height: 100vh;
  font-size: 9rem;
`