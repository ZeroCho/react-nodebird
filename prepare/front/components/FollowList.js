import React from 'react'
import { Button, Card, List } from 'antd';
import PropTypes from 'prop-types'
import {StopOutlined} from '@ant-design/icons'

// style부분 style-component로 만들어주기!



            // props 부분 : 여기는 자식부분
const FollowList = ({header, data}) => {
    return( 
        <List 
            style={{marginBottom :20}}
            grid={{gutter:4, xs:2, md:3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{textAlign: 'center' , margin:'10px 0'}}><Button>더보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{marginTop: 20}}>
                    <Card actions={[<StopOutlined key='stop' />]}> 
                    {/* Card의 actions부분이 아이콘 부분임 */}
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    )
} 


FollowList.propTypes = {
    header : PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

export default FollowList;