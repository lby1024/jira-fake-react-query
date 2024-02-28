import { useUsers } from '../../model/User'
import { FC, useMemo } from 'react'
import { Select } from 'antd'

interface IUserSelect {
  value?: number
  onChange?: (v: number) => void
}

export const UserSelect: FC<IUserSelect> = ({ value: personId, onChange }) => {
  const { data: users } = useUsers()

  const options = useMemo(() => {
    if (!users) return null

    const res = users.map(user => ({
      value: user.id,
      label: user.name
    }))
    return [{ label: '负责人', value: 0 }, ...res]
  }, [users])

  const label = useMemo(() => {
    if (!options || !personId) return
    const user = options.find(item => item.value === personId)
    if (user) return user.label
  }, [personId, options])

  return <Select
    options={options}
    value={label}
    onSelect={v => onChange(Number(v))}
    placeholder='管理员'
  />
}