import { FC } from "react";
import { Dropdown, MenuProps } from 'antd';
import { styled } from "styled-components";
import { useAuth } from "../../data";

const UserBtn = () => {
    const { logout, user } = useAuth()

    const items: MenuProps['items'] = [{
        key: '1',
        label: <div onClick={logout} >登出</div>
    }]

    return <Dropdown menu={{items}} >
        <span>Hi, {user?.nickName}</span>
    </Dropdown>
}

const Header: FC = () => {

    return (
        <Container>
            <h1>Jira</h1>
            <div>项目</div>
            <div>用户</div>
            <div></div>
            <UserBtn/> 
        </Container>
    )
}

export default Header

const Container = styled.div`
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) inset;
    height: 6rem;
    display: grid;
    grid-template-columns: 9rem 100px 100px 1fr 100px;
    grid-template-rows: 1fr;
    > * {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`