import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';


const Profile = () => {

    //더미데이터
     const FollowerList = [{nickname: '어니'} , {nickname: '맹란'} , {nickname: '나미'}];
     const FollowingList = [{nickname: '어니'} , {nickname: '맹란'} , {nickname: '나미'}];


    return(
        <>
        <Head>
            <meta charSet='utf-8' />
            <title>내 프로필</title>
        </Head>

        {/* body 부분 */}
        <AppLayout>
            <NicknameEditForm />  
            <FollowList header="팔로잉 목록" data={FollowingList} />
            <FollowList header="팔로워 목록" data={FollowerList} />
        </AppLayout>
        </>
    )
}

export default Profile;