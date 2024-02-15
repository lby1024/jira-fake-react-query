import { useAuth } from './model/Auth'
import { LoginPage } from './pages/login'
import { Router } from './router'

function App() {

  const { user } = useAuth()

  return (
    <>
      {
        user ? <Router/> : <LoginPage/>
      }
    </>
  )
}

export default App
