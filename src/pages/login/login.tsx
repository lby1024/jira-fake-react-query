import { Button, Input, message } from "antd"
import { useForm, required, min, password } from "sweety-form"
import styled from 'styled-components'
import { useAuth } from "../../model/Auth"


class FormModel {
  @required()
  @min(3)
  nickName: string

  @password('密码只能由数字或字母或符号组成')
  password: string
}

export const Login = () => {
  const { login, submiting } = useAuth()
  const [messageApi, contextHolder] = message.useMessage();
  const [{errors}, {name, submit}] = useForm<FormModel>({
    FormModel,
    onSuccess: data => login(data)
  })
  
  const showError = (err: any) => {
    messageApi.open({
      type: 'error',
      content: err.message
    });
  };

  return <Content>
    {contextHolder}

    <Input {...name('nickName')} placeholder="nick name" />
    <ErrorInfo>{errors.nickName}</ErrorInfo>

    <Input.Password {...name('password')} placeholder="password" />
    <ErrorInfo>{errors.password}</ErrorInfo>

    <Button className="btn" type="primary" loading={submiting} onClick={submit} >登录</Button>
  </Content>
}

const Content = styled.div`
  .btn {
    width: 100%;
  }
`

const ErrorInfo = styled.div`
  height: 1.6rem;
  font-size: 12px;
  color: deeppink;
`