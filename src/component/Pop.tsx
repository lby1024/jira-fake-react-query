import { useState } from "react"
import { sleep } from "../tool"
import { styled } from "styled-components"
import { Alert } from "antd"
import { PopProject } from "./Pop.project"

type UI = {
  error?: InfoInput
  project?: ProjectInput
  success?: InfoInput
}

export type InfoInput = {
  info: string
}

export type ProjectInput = {
  type: 'create' | 'update'
  projectId?: number
}

const useUI = () => {
  const [ui, setU] = useState<UI>({})

  const setUi = (data: UI) => {
    setU(ui => ({
      ...ui,
      ...data
    }))
  }

  return [ui, setUi] as const
}

const PopUp = () => {

  const [ui, setUI] = useUI()

  Pop.open.error = async (info: string) => {
    setUI({
      error: { info }
    })
    await sleep(2000)
    setUI({ error: null })
  }
  Pop.open.success = async (info: string) => {
    setUI({
      success: { info }
    })
    await sleep(2000)
    setUI({ success: null })
  }

  Pop.open.project = async (param: ProjectInput) => {
    setUI({ project: param })
  }

  Pop.close.project = () => {
    setUI({ project: null })
  }

  return <>
    {ui.error && <ErrorInfo message={ui.error.info} type="error" showIcon />}
    {ui.success && <ErrorInfo message={ui.success.info} type="success" showIcon />}
    {ui.project && <PopProject open={!!ui.project} payload={ui.project} />}
  </>
}

export class Pop {
  static UI = PopUp

  static open = {
    error: null as Function,
    success: null as Function,
    project: null as (param: ProjectInput) => any
  }

  static close = {
    project: null as Function
  }

}

const ErrorInfo = styled(Alert)`
  position: absolute !important;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
`