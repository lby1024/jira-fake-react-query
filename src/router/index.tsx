import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { ProjectList } from "../pages/project-list";
import { PageKanban } from "../pages/kanban";
import { EpicPage } from "../pages/epic";
import { SideNavLayout } from "./SideNavLayout";
import { StudentPage } from "../pages/students";

const sideNavRouter: RouteObject[] = [{
  path: 'kanban',
  element: <PageKanban />
}, {
  path: 'epic',
  element: <EpicPage />
}, {
  path: 'student',
  element: <StudentPage />
}, {
  path: '',
  element: <Navigate to={window.location.pathname + "/kanban"} />
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
