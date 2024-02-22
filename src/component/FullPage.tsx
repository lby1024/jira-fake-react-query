import { Spin, Typography } from 'antd'
import { FC } from 'react'
import { styled } from 'styled-components'

export const FullPageLoading = () => {
  return <FullPage>
    <Spin size='large' />
  </FullPage>
}

interface IFullPageError {
  error: string
}

export const FullPageError: FC<IFullPageError> = (props) => {
  return <FullPage>
    <Typography.Text type='danger' >{props.error}</Typography.Text>
  </FullPage>
}

const FullPage = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`
