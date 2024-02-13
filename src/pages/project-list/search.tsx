import { useState } from "react"
import {Flex, Input, Select} from 'antd'
import { useUsers } from "../../data"

export const Search = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const { data } = useUsers()

  const onInput = (name: string) => {
    setParam({
      ...param,
      name
    })
  }

  const onSelect = (personId: string) => {
    setParam({
      ...param,
      personId
    })
  }

  return <Flex gap='small'>
    <Input onChange={e => onInput(e.target.value)} />
    <Select value={param.personId} onChange={v => onSelect(v)} >
      <Select.Option value='' >负责人</Select.Option>
      {
        data && data.map(user => <Select.Option value={user.id} key={user.id}>{ user.name}</Select.Option>)
      }
    </Select>
  </Flex>
}