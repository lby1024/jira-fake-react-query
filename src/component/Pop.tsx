import { ReactNode, useState } from "react"
import { sleep } from "../tool"
import { styled } from "styled-components"
import { Alert } from "antd"

type UI = {
  error: {
    info: string
  }
}

const useUI = () => {
  const [ui, setU] = useState<UI>({
    error: null
  })

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

  Pop.error = async (info: string) => {
    setUI({
      error: { info }
    })
    await sleep(2000)
    setUI({ error: null })
  }

  return <>
    {ui.error && <ErrorInfo message={ui.error.info} type="error" showIcon />}
  </>
}

export class Pop {
  static error: Function
  static UI = PopUp
}


const ErrorInfo = styled(Alert)`
  position: absolute !important;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
`