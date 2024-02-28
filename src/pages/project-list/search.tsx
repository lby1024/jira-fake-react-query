import { useUrlParams } from "../../tool/useUrlParams"
import { Flex, Input } from 'antd'
import { UserSelect } from "./UserSelect"

export const Search = () => {

  const [param, setParam] = useUrlParams('name', 'personId')

  const onInput = (name: string) => {
    setParam({ name })
  }

  const setPersonId = (id: number) => {
    setParam({
      personId: id === 0 ? '' : String(id)
    })
  }

  return (
    <Flex gap='middle' style={{ width: '39rem' }}>
      <Input value={param.name} onChange={e => onInput(e.target.value)} />
      <UserSelect value={Number(param.personId)} onChange={id => setPersonId(id)} />
    </Flex>
  )
}