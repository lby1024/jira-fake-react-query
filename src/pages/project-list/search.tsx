import { Flex, Input } from 'antd'
import { UserSelect } from "../../component/UserSelect"
import { useUrlParams } from '../../tool/useUrlParams'
import styled from 'styled-components'

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
      <Selec value={param.personId} onChange={id => setPersonId(id)} />
    </Flex>
  )
}

const Selec = styled(UserSelect)`
  width: 120px;
`