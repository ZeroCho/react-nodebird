import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";


// 로그인 후 보여질 화면
const UserProfile = ({setIsLoggedin}) => {

    const onLogOut = useCallback(() => {
        setIsLoggedin(false)
    },[])


    return(
        <Card
            actions={[ // 배열이기 때문에 key 넣어줘야 함!!
                <div key="twit">짹짹<br />0</div>,
                <div key="following">팔로잉<br />0</div>,
                <div key="follower">팔로워<br />0</div>
            ]}
        >

            <Card.Meta 
                avatar={<Avatar>ZC</Avatar>}
                title="Oneee"
                />
            
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;