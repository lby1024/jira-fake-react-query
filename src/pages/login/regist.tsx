import { Button, Input } from "antd"
import { useForm, required, min, password, rule } from "sweety-form"
import styled from 'styled-components'
import { useAuth } from "../../model/Auth"
import { Pop } from "../../component/Pop"

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
  if (v !== formData.password) return '密码不一致'
}

export const Regist = () => {
  const { regist, state } = useAuth()
  const [{ errors }, { name, submit }] = useForm<FormModel>({
    FormModel,
    onSuccess: data => regist(data).catch(err => Pop.error(err.message))
  })


  return <Content>
    <Input {...name('nickName')} placeholder="nick name" />
    <ErrorInfo>{errors.nickName}</ErrorInfo>

    <Input.Password {...name('password')} placeholder="password" />
    <ErrorInfo>{errors.password}</ErrorInfo>

    <Input.Password {...name('repassword')} placeholder="repassword" />
    <ErrorInfo>{errors.repassword}</ErrorInfo>

    <Button className="btn" type="primary" loading={state === 'loading'} onClick={submit} >注册</Button>
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