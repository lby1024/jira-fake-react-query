import { createBrowserRouter, RouterProvider, Navigate, RouteObject } from "react-router-dom";
import { ProjectList } from "../pages/project-list";
import { HeadLayout } from "./HeadLayout";
import { PageKanban } from "../pages/kanban";
import { Epic } from "../pages/epic";
import { SideNavLayout } from "./SideNavLayout";

const sideNavRouter: RouteObject[] = [{
  path: 'kanban',
  element: <PageKanban />
}, {
  path: 'epic',
  element: <Epic />
}]

const headRouter: RouteObject[] = [{
  path: '',
  element: <ProjectList />,
}, {
  path: ':id',
  element: <SideNavLayout />,
  children: sideNavRouter
}]

const router = createBrowserRouter([{
  path: 'projects',
  element: <HeadLayout />,
  children: headRouter
}, {
  path: '*',
  element: <Navigate to='projects' />
}])

export const Router = () => <RouterProvider router={router} />