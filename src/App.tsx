import { useAuth } from './model/Auth'
import { LoginPage } from './pages/login'
import { HeadLayout } from './router/HeadLayout'

function App() {

  const { token } = useAuth()

  return (
    <>
      {
        token ? <HeadLayout/> : <LoginPage/>
      }
    </>
  )
}

export default App
