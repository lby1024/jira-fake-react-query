import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { ProjectList } from "../pages/project-list";
import { PageKanban } from "../pages/kanban";
import { Epic } from "../pages/epic";
import { SideNavLayout } from "./SideNavLayout";

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


export const router = createBrowserRouter([{
  path: 'projects',
  element: <ProjectList />,
}, {
  path: 'projects/:id',
  element: <SideNavLayout />,
  children: sideNavRouter
}, {
  path: '*',
  element: <Navigate to='projects' />
}])
