import { Button, Card, Divider, Flex } from 'antd'
import { Regist } from './regist'
import { useState } from 'react'
import { Login } from './login'
import { styled } from 'styled-components'

export const LoginPage = () => {
  const [isRegist, setRegist] = useState(false)
  const btnInfo = isRegist ? "已经有账号了？直接登录" : "没有账号？注册新账号"

  return (
    <Content justify='center' align='center' >
      <ShadowCard>
        <Title>{isRegist ? "请注册" : "请登录"}</Title>
        { isRegist ? <Regist/> : <Login/> }
        <Divider />
        <Button type='link' onClick={()=>setRegist(!isRegist)} >{ btnInfo }</Button>
      </ShadowCard>
    </Content>
  )
}

const Content = styled(Flex)`
  width: 100vw;
  height: 100vh;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
  width: 30rem;
  min-height: 39vh;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;
