import { useCallback } from "react";

import { Card, Avatar, Button } from "antd";
import styled from "styled-components";

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <CardWrapper
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="following">
          팔로잉
          <br />0
        </div>,
        <div key="following">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>Sorin</Avatar>} title="Sorin0404" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </CardWrapper>
  );
};

const CardWrapper = styled(Card)`
  text-align: center;
`;

export default UserProfile;
