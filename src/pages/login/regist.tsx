import { Button, Input } from "antd"
import { Form, required, min, formItem, label, password, rule } from "sweety-form"

class FormModel {

  @label('昵称')
  @formItem(<Input placeholder="nick name" />)
  @required()
  @min(3)
  email: string

  @label('密码')
  @formItem(<Input.Password placeholder="password"/>)
  @password('密码只能由数字或字母或符号组成')
  password: string

  @label('确认密码')
  @formItem(<Input.Password placeholder="password"/>)
  @rule(rePassword)
  repassword: string
}

function rePassword(v: string, formData: FormModel) {
  if(v !== formData['password']) return '密码不一致'
}

export const Regist = () => {

  return (
    <Form
      form={FormModel}
      subButton={<Button type="primary" >submit</Button>}
      onSuccess={res => console.log(res)}
    />
  )
}