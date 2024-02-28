import { Flex, Input } from 'antd'
import { UserSelect } from "./UserSelect"
import { useProjectParams } from '../../model/Project'

export const Search = () => {
  // 双向绑定url中的 name, personId
  const [param, setParam] = useProjectParams()

  const onInput = (name: string) => {
    setParam({ name })
  }

  const setPersonId = (personId: number) => {
    setParam({ personId })
  }

  return (
    <Flex gap='middle' style={{ width: '39rem' }}>
      <Input value={param.name} onChange={e => onInput(e.target.value)} />
      <UserSelect value={param.personId} onChange={id => setPersonId(id)} />
    </Flex>
  )
}