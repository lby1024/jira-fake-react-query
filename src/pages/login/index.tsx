import { Button, Card, Divider, Flex } from 'antd'
import {Regist} from './regist'
import { useState } from 'react'
import { Login } from './login'
import { styled } from 'styled-components'

export const LoginPage = () => {
  const [isRegist, setRegist] = useState(false)

  return (
    <Flex style={{ width: '100vw', height: '100vh' }} justify='center' align='center' >
      <Card style={{ width: '39vw', height: '50vh' }}>
        <Title>{isRegist ? "请注册" : "请登录"}</Title>
          { isRegist ? <Regist/> : <Login/> }
          <Divider />
          <Button type='link' onClick={()=>setRegist(!isRegist)} >
            { isRegist ? "已经有账号了？直接登录" : "没有账号？注册新账号" }
          </Button>
      </Card>
    </Flex>
  )
}


const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
