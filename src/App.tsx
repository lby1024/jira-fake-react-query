import { useAuth } from './model/Auth'
import { LoginPage } from './pages/login'
import { HeadLayout } from './router/HeadLayout'
import { useMounted } from './tool/useMounted'

function App() {

  const auth = useAuth()
  

  return (
    <>
      {
        auth.userInfo ? <HeadLayout/> : <LoginPage/>
      }
    </>
  )
}

export default App
