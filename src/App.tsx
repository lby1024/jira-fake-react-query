import { LoginPage } from './pages/login'
import { ProjectList } from './pages/project-list'
import { useAuth } from './data'

function App() {

  const { user, regist } = useAuth()

  return (
    <>
      {
        user.token ? <ProjectList/> : <LoginPage/>
      }
    </>
  )
}

export default App
