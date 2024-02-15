import { useAuth } from './model/Auth'
import { LoginPage } from './pages/login'
import { ProjectList } from './pages/project-list'

function App() {

  const { user } = useAuth()

  return (
    <>
      {
        user ? <ProjectList/> : <LoginPage/>
      }
    </>
  )
}

export default App
