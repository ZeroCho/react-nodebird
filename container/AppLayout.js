import { Col } from 'antd';

const AppLayout = ({ children }) => {
  return <div>
    <Col xs={6} md={6}>1/4</Col>
    <Col xs={18} md={18}>
      3/4
      {children}
    </Col>
  </div>
};

export default AppLayout;
