import { FullPageLoading } from './component/FullPage'
import { useAuth } from './model/Auth'
import { LoginPage } from './pages/login'
import { HeadLayout } from './router/HeadLayout'
import { useMounted } from './tool/useMounted'

function App() {
  const { state, getUserInfo, userInfo } = useAuth()

  useMounted(() => getUserInfo)

  if (state === 'idle') return <FullPageLoading />

  return <>
    {
      userInfo ? <HeadLayout /> : <LoginPage />
    }
  </>

}

export default App
