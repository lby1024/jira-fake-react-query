import { Button, Input, message } from "antd"
import { useForm, required, min, password, rule } from "sweety-form"
import styled from 'styled-components'
import { useAuth } from "../../model/Auth"

class FormModel {
  @required()
  @min(3)
  nickName: string

  @password('密码只能由数字或字母或符号组成')
  password: string

  @rule(repassword)
  repassword: string
}

function repassword(v: string, formData: FormModel) {
  if(v !== formData.password) return '密码不一致'
}

export const Regist = () => {
  const { regist, loading } = useAuth()
  const [messageApi, contextHolder] = message.useMessage();
  const [{errors}, {name, submit}] = useForm<FormModel>({
    FormModel,
    onSuccess: data => regist(data)
  })
  
  const error = (err: any) => {
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

    <Input.Password {...name('repassword')} placeholder="repassword" />
    <ErrorInfo>{errors.repassword}</ErrorInfo>

    <Button className="btn" type="primary" loading={loading} onClick={submit} >注册</Button>
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