import { router } from "."
import Header from "../component/Header"
import { RouterProvider } from 'react-router-dom'

export const HeadLayout = () => {
  return <div>
    <Header/>
    <RouterProvider router={router} />
  </div>
}