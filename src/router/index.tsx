import { createBrowserRouter, RouterProvider, Navigate, RouteObject } from "react-router-dom";
import { ProjectList } from "../pages/project-list";
import { HeadLayout } from "./HeadLayout";
import { PageKanban } from "../pages/kanban";
import { Epic } from "../pages/epic";
import { SideNavLayout } from "./SideNavLayout";
import { Page404 } from "../pages/404";

const sideNavRouter: RouteObject[] = [{
  path: '',
  element: <Navigate to={window.location.pathname + "/kanban"} />
}, {
  path: 'kanban',
  element: <PageKanban />
}, {
  path: 'epic',
  element: <Epic />
}]

const headRouter: RouteObject[] = [{
  path: '',
  element: <Navigate to='projects' />
}, {
  path: 'projects',
  element: <ProjectList />,
}, {
  path: 'projects/:id',
  element: <SideNavLayout />,
  children: sideNavRouter
}]

const router = createBrowserRouter([{
  path: '',
  element: <HeadLayout />,
  children: headRouter,
  errorElement: <Page404 />
}])

export const Router = () => <RouterProvider router={router} />