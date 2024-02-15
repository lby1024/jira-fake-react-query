import Header from "../ui/Header"
import { Outlet } from 'react-router-dom'

export const HeadLayout = () => {
  return <>
    <Header/>
    <Outlet/>
  </>
}