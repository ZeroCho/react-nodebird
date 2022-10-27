import React, { useCallback, useMemo, useState } from "react";
import {Form, Input, Button} from 'antd'
import Link from "next/link";
import styled from 'styled-components'



const ButtonWrapper = styled.div`
    margin-top:10px;
`
const FormWrapper = styled(Form)`
    padding:10px;
    
`




// 로그인 화면
const LoginForm = ({setIsLoggedin}) => {

    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    // const [passwordCheck, setPasswordCheck] = useState('')

const onChangeId = useCallback((e) => {
    // 컴포넌트에 프롭스로 넘겨주는 함수는 usecallback을 써라. 그래야 최적화가 되기 때문이다.
    setId(e.target.value)
},[])


const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
},[])

const style = useMemo(() => ({margin: 10}),[])
// 이렇게 해야 최적화가 된다..

const onSubmitForm = useCallback(() => {
    console.log(id, password)
    setIsLoggedin(true)
},[id, password])


    return(
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required /> 
            </div>

            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password"
                     value={password}
                     onChange={onChangePassword}
                     required
                     type="password"
                     /> 
            </div>

            {/* <div>
                <label htmlFor="user-passwordCheck">비밀번호 체크</label>
                <br />
                <Input name="user-passwordCheck" value={passwordCheck} onChange={onChangePasswordCheck} required /> 
            </div> */}

           <ButtonWrapper style={style}>
            <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
            <Link href={'/signup'}><a>회원가입</a></Link>
           </ButtonWrapper>
        </FormWrapper>
    )
}

export default LoginForm;