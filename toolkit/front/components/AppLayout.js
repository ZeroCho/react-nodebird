import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const { Header, Content } = Layout;
const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .ant-col:first-child {
    margin-left: 0 !important;
  }
  .ant-col:last-child {
    margin-right: 0 !important;
  }
  .ant-form-item-explain-error {
    font-size: 11px;
  }
`;
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

function AppLayout({ children }) {
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Global />
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[router.pathname]}
          items={[
            { label: <Link href="/">노드버드</Link>, key: '/' },
            { label: <Link href="/profile">프로필</Link>, key: '/profile' },
            { label: <SearchInput
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
            />,
            key: '/search' },
          ]}
        />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ minHeight: '400px', padding: '24px', backgroundColor: '#FFF' }}>
          {/* gutter 컬럼 사이의 간격 */}
          <Row gutter={12}>
            <Col xs={24} sm={24} md={8} lg={4} style={{ paddingTop: '12px' }}>
              {me ? <UserProfile /> : <LoginForm />}
            </Col>
            <Col xs={24} sm={24} md={16} lg={20} style={{ paddingTop: '12px' }}>
              {children}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
