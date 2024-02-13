import { LoginPage } from './pages/login'
import { ProjectList } from './pages/project-list'
import { useAuth } from './data'

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
