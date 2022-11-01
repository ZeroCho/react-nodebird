import React, { useCallback, useMemo } from "react";
import {Form, Input, Button} from 'antd'
import Link from "next/link";
import styled from 'styled-components'

import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers";

const ButtonWrapper = styled.div`
    margin-top:10px;
`
const FormWrapper = styled(Form)`
    padding:10px;
    
`


// 로그인 화면
const LoginForm = () => {
    const dispatch = useDispatch();

    const [id, onChangeId] = useInput('')
    const[password, onChangePassword] = useInput('');
    // 이 한 줄 자체가 
    // const [id, setId] = useState('')
    // const onChangeId = useCallback((e) => {
//          setId(e.target.value)     
   // })
    //  요 두 기능과 같은 것이다..!!



    // const[nickname, onChangeNickname] = useInput('');
    
    // const [passwordCheck, setPasswordCheck] = useState('');
    // const[passwordError, setPasswordError] = useState(false)


    // const oonChangePasswordCheck = useCallback((e) => {
    //     setPasswordCheck(e.target.value)
    //     setPasswordError(e.target.value !== password)
    // },[password])



const style = useMemo(() => ({margin: 10}),[])
// 이렇게 해야 최적화가 된다..

const onSubmitForm = useCallback(() => {
    console.log(id, password)
    dispatch(loginAction({id,password}))
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