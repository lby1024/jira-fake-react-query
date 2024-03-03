import { useUsers } from '../model/User'
import { FC, useMemo } from 'react'
import { Select } from 'antd'

interface IUserSelect {
  value?: string
  onChange?: (v: string) => void
  className?: string
}

export const UserSelect: FC<IUserSelect> = ({ value, onChange, className }) => {
  const { data: users } = useUsers()
  const personId = value ? Number(value) : 0

  const options = useMemo(() => {
    if (!users) return null

    const res = users.map(user => ({
      value: user.id,
      label: user.name
    }))
    return [{ label: '负责人', value: 0 }, ...res]
  }, [users])

  const label = useMemo(() => {
    if (!options) return
    const user = options.find(item => item.value === personId)
    if (user) return user.label
  }, [personId, options])

  return <Select
    className={className}
    options={options}
    value={label}
    onSelect={v => onChange(v)}
  />
}