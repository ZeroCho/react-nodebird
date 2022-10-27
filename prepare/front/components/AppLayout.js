import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'
import styled from 'styled-components';


const SearchInput  = styled(Input.Search)`
    vertical-align: middle;
`

const AppLayout = ({children}) => {

    const [isLoggedin, setIsLoggedin] = useState(false)

    return (
    <div>
        <Menu mode="horizontal">
            <Menu.Item>
                <Link href={"/"}><a>노드버드</a></Link>
            </Menu.Item>

            <Menu.Item>
                <Link href={"/profile"}><a>프로필</a></Link>
            </Menu.Item>
            <Menu.Item>
                <SearchInput allowClear style={{ verticalAlign : 'middle' }} />
            </Menu.Item>
            <Menu.Item>
                <Link href={"/signup"}><a>회원가입</a></Link>
            </Menu.Item>
        </Menu>
        <Row gutter={4}>
            <Col xs={24} md={6}>
                {isLoggedin ? <UserProfile setIsLoggedin={setIsLoggedin} /> : <LoginForm setIsLoggedin={setIsLoggedin} />} 
                {/* 로그인 하면 UserProfile를 보여주고 안 된 상태이면 LoginForm */}
            </Col>
            <Col xs={24} md={12}>
            {children}
            </Col>
            <Col xs={24} md={6}>
                {/* refferrer openner는 새 창을 열었을 때 누가 새 창을 열었는지 정보를 없애는 용도. 즉 보안에 대한 태그들임. */}
                <a href='https://velog.io/@everyone_joy' target="_blank" rel='noreferrer noopener'> 
                    Made By one
                </a>
            </Col>
        </Row>
        
    </div>
)
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired, 
};


export default AppLayout;