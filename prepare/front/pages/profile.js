import Head from "next/head";

import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
  const follwerList = [
    { nickname: "소린" },
    { nickname: "바보" },
    { nickname: "노드버드오피셜" },
  ];
  const follwingList = [
    { nickname: "소린" },
    { nickname: "바보" },
    { nickname: "노드버드오피셜" },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={follwingList} />
        <FollowList header="팔로워 목록" data={follwerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
