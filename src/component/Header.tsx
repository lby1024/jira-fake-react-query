import { FC } from "react";
import { Dropdown, MenuProps } from 'antd';
import { styled } from "styled-components";
import { useAuth } from "../model/Auth";
import { resetRoute } from "../tool";

const UserBtn = () => {
    const { logout, userInfo } = useAuth()

    const items: MenuProps['items'] = [{
        key: '1',
        label: <div onClick={() => logout()} >登出</div>
    }]

    return <Dropdown menu={{ items }} >
        <span>Hi, {userInfo.nickName}</span>
    </Dropdown>
}

const Header: FC = () => {

    return (
        <Container>
            <h3 className="jira" onClick={() => resetRoute()} >Jira</h3>
            <div>项目</div>
            <div>用户</div>
            <div></div>
            <UserBtn />
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
    .jira {
        font-size: 2rem;
        color: #333;
        font-weight: bolder;
        text-decoration: none;
    }
    > * {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`