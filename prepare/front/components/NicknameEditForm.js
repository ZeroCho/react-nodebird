import React, {useMemo} from 'react'
import { Form, Input } from 'antd';

// form은 react라이브러리 사용하는 것이 더 편리함 (당연한 소리)

const NicknameEditForm = () => {

    // 이렇게 해줘야 최적화 된다는 점. 즉 두번 렌더링 안된다.
    const style = useMemo(() => ({
        marginBottom: '20px', border:'1px solid #d9d9d9', padding: '20px'}),[])

    return(
       <Form style={style}>
            <Input.Search addonBefore="닉네임" enterButton="수정"/>
       </Form>
    )
}

export default NicknameEditForm;