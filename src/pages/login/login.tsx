import { Button, Input } from "antd"
import { useForm, required, min, password } from "sweety-form"
import styled from 'styled-components'
import { useAuth } from "../../model/Auth"
import { Pop } from "../../component/Pop"
import { ErrorInfo } from "../../component/ErrorInfo"


class FormModel {
  @required()
  @min(3)
  nickName: string

  @password('密码只能由数字或字母或符号组成')
  password: string
}

export const Login = () => {
  const { login, state } = useAuth()
  const [{ errors }, { name, submit }] = useForm<FormModel>({
    FormModel,
    onSuccess: data => login(data).catch(err => Pop.open.error(err.message))
  })



  return <Content>
    <Input {...name('nickName')} placeholder="nick name" />
    <ErrorInfo>{errors.nickName}</ErrorInfo>

    <Input.Password {...name('password')} placeholder="password" />
    <ErrorInfo>{errors.password}</ErrorInfo>

    <Button className="btn" type="primary" loading={state === 'loading'} onClick={submit} >登录</Button>
  </Content>
}

const Content = styled.div`
  .btn {
    width: 100%;
  }
`