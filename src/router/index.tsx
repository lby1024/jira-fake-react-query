import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { ProjectList } from "../pages/project-list";
import { PageKanban } from "../pages/kanban";
import { EpicPage } from "../pages/epic";
import { SideNavLayout } from "./SideNavLayout";
import { Pagination } from "../pages/pagination";
import { InfinityPage } from "../pages/infinity";

const sideNavRouter: RouteObject[] = [{
  path: 'kanban',
  element: <PageKanban />
}, {
  path: 'epic',
  element: <EpicPage />
}, {
  path: 'pagination',
  element: <Pagination />
}, {
  path: 'infinity',
  element: <InfinityPage />
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
