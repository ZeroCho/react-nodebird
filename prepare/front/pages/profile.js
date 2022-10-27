import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head'


const Profile = () => {
    return(
        <>
        <Head>
            <meta charSet='utf-8' />
            <title>내 프로필</title>
        </Head>
        <AppLayout>프로필 페이지</AppLayout>
        </>
    )
}

export default Profile;