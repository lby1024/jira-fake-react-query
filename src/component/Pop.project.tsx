import { Button, Drawer, Flex, Input } from "antd"
import styled from "styled-components"
import { formItem, label, max, min, required, useForm } from "sweety-form"
import { UserSelect } from "./UserSelect"
import { FC, useEffect, useMemo } from "react"
import { Pop, ProjectInput } from "./Pop"
import { ErrorInfo } from "./ErrorInfo"
import { useCreateProject, useProject, useUpdateProject } from "../model/Project.use"

class FormModel {
  // @label('名称')
  // @formItem(<Input placeholder="请输入项目名称" />)
  @required()
  @min(3, '项目名称不能少于3个字')
  @max(9, '项目名称不能大于9个字')
  name: string

  @label('部门')
  @formItem(<Input placeholder="请输入部门名称" />)
  @required()
  @min(3, '部门名称不能少于3个字')
  @max(9, '部门名称不能大于9个字')
  organization: string

  @label('负责人')
  @formItem(<UserSelect />)
  personId: number
}

interface PopProjectProps {
  open: boolean
  payload?: ProjectInput
}

export const PopProject: FC<PopProjectProps> = ({ open, payload }) => {
  const { type, projectId } = payload || {}
  const initialData = useInitialData(projectId)
  const [{ errors }, { name, submit, setForm }] = useForm<FormModel>({
    FormModel,
    onSuccess: sub,
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    }
  }, [initialData])


  const create = useCreateProject()
  const update = useUpdateProject()

  function sub(data: FormModel) {
    if (type === 'create') create.mutate(data)
    if (type === 'update') update.mutate({ id: projectId, data })
  }

  const loading = create.isPending || update.isPending

  const Card = (
    <CardFlex vertical align="center" className="card" >
      <h1>{type === 'create' ? "创建项目" : "更新项目"}</h1>

      <Input {...name('name')} placeholder="请输入项目名称" />
      <ErrorInfo>{errors.name}</ErrorInfo>

      <Input {...name('organization')} placeholder="请输入项目名称" />
      <ErrorInfo>{errors.organization}</ErrorInfo>

      <UserSelectt {...name('personId')} />
      <ErrorInfo>{errors.personId}</ErrorInfo>

      <SubBtn type="primary" onClick={submit} loading={loading} >提交</SubBtn>
    </CardFlex>
  )

  return <Drawer open={!!open} width="100vw" onClose={() => Pop.close.project()} >
    {open && Card}
  </Drawer>
}

const CardFlex = styled(Flex)`
  margin: 0 auto;
  width: 50%;
`

const UserSelectt = styled(UserSelect)`
  width: 100%;
`

const SubBtn = styled(Button)`
  width: 100%;
`

function useInitialData(projectId: number) {
  const project = useProject(projectId)

  const initData = useMemo(() => {
    if (project.data) {
      return {
        organization: project.data?.organization,
        name: project.data?.name,
        personId: project.data?.personId
      }
    }
    return null
  }, [project.data])

  return initData
}

