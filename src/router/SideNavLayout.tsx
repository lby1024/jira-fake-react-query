import { Layout, Menu, MenuProps } from "antd"
import { Link, Outlet, useLocation } from "react-router-dom"
import styled from "styled-components"

const { Sider, Content } = Layout

const items: MenuProps['items'] = [
  { label: <Link to='kanban' >看板</Link>, key: 'kanban', },
  { label: <Link to='epic'>epic</Link>, key: 'epic' },
  { label: <Link to='pagination'>分页</Link>, key: 'pagination' },
  { label: <Link to='infinity'>infinity</Link>, key: 'infinity' },
]

const useCurKey = () => {
  const { pathname } = useLocation()
  const names = pathname.split('/')
  return names[names.length - 1]
}

export const SideNavLayout = () => {

  const curKey = useCurKey()

  return <MyLayout>
    <Sider theme="light" >
      <Menu className="menu" items={items} defaultSelectedKeys={[curKey]} mode='inline' />
    </Sider>

    <Content className="content">
      <Outlet />
    </Content>
  </MyLayout>
}

const MyLayout = styled(Layout)`
  height: calc(100vh - 6rem);
  .menu {
    height: 100%;
  }
  .content {
    overflow: auto;
    background-color: #fff;
    padding: 3rem;
  }
`