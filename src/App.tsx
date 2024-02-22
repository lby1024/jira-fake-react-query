import { FullPageLoading } from './component/FullPage'
import { useAuth } from './model/Auth'
import { LoginPage } from './pages/login'
import { HeadLayout } from './router/HeadLayout'

function App() {

  const { userInfo, isLoading } = useAuth()

  if (isLoading) return <FullPageLoading />

  return <>
    {
      userInfo ? <HeadLayout /> : <LoginPage />
    }
  </>

}

export default App
