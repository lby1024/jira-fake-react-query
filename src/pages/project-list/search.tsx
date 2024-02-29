import { Flex, Input } from 'antd'
import { UserSelect } from "./UserSelect"
import { useUrlParams } from '../../tool/useUrlParams'

export const Search = () => {
  // 双向绑定url中的 name, personId
  const [param, setParam] = useUrlParams('name', 'personId')

  const onInput = (name: string) => {
    setParam({ name })
  }

  const setPersonId = (personId: string) => {
    setParam({ personId })
  }

  return (
    <Flex gap='middle' style={{ width: '39rem' }}>
      <Input placeholder='项目名称' value={param.name} onChange={e => onInput(e.target.value)} />
      <UserSelect value={param.personId} onChange={id => setPersonId(id)} />
    </Flex>
  )
}