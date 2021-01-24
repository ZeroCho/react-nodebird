import { createSlice } from '@reduxjs/toolkit';
import _remove from 'lodash/remove';
import {
  changeNickname,
  follow,
  loadMyInfo,
  loadUser,
  login,
  logout,
  removeFollow,
  signup,
  unfollow
} from '../actions/user';

// 기본 state
export const initialState = {
  me: null, // 내 정보
  userInfo: null, // 유저 정보
  loadMyInfoLoading: false, // 로그인 정보 조회
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false, // 유저 정보 조회
  loadUserDone: false,
  loadUserError: null,
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
  logoutLoading: false, // 로그아웃 시도중
  logoutDone: false,
  logoutError: null,
  signupLoading: false, // 회원가입 시도중
  signupDone: false,
  signupError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false, // 팔로우
  followDone: false,
  followError: null,
};

// toolkit 사용방법
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPostToMe(state, action) {
      state.me.Posts.unshift({ id: action.payload });
    },
    removePostToMe(state, action) {
      _remove(state.me.Posts, (v) => v.id === action.payload);
    },
  },
  extraReducers: (builder) => builder
    // login
    .addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.me = action.payload;
      state.loginDone = true;
    })
    .addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    })
    // logout
    .addCase(logout.pending, (state) => {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    })
    .addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
      state.logoutDone = true;
      state.me = null;
    })
    .addCase(logout.rejected, (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    })
    // signup
    .addCase(signup.pending, (state) => {
      state.signupLoading = true;
      state.signupDone = false;
      state.signupError = null;
    })
    .addCase(signup.fulfilled, (state) => {
      state.signupLoading = false;
      state.signupDone = true;
    })
    .addCase(signup.rejected, (state, action) => {
      state.signupLoading = false;
      state.signupError = action.payload;
    })
    // loadMyInfo
    .addCase(loadMyInfo.pending, (state) => {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = null;
    })
    .addCase(loadMyInfo.fulfilled, (state, action) => {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = true;
      state.me = action.payload;
    })
    .addCase(loadMyInfo.rejected, (state, action) => {
      state.loadMyInfoLoading = false;
      state.loadMyInfoError = action.payload;
    })
    // loadUser
    .addCase(loadUser.pending, (state) => {
      state.loadUserLoading = true;
      state.loadUserDone = false;
      state.loadUserError = null;
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      state.loadUserLoading = false;
      state.loadUserDone = true;
      state.userInfo = action.payload;
    })
    .addCase(loadUser.rejected, (state, action) => {
      state.loadUserLoading = false;
      state.loadUserError = action.payload;
    })
    // changeNickname
    .addCase(changeNickname.pending, (state) => {
      state.changeNicknameLoading = true;
      state.changeNicknameDone = false;
      state.changeNicknameError = null;
    })
    .addCase(changeNickname.fulfilled, (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameDone = true;
      state.me.nickname = action.payload.nickname;
    })
    .addCase(changeNickname.rejected, (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameError = action.payload;
    })
    // follow
    .addCase(follow.pending, (state) => {
      state.followLoading = true;
      state.followDone = false;
      state.followError = null;
    })
    .addCase(follow.fulfilled, (state, action) => {
      state.followLoading = false;
      state.followDone = true;
      state.me.Followings.push({ id: action.payload.UserId });
    })
    .addCase(follow.rejected, (state, action) => {
      state.followLoading = false;
      state.followError = action.payload;
    })
    // unfollow
    .addCase(unfollow.pending, (state) => {
      state.followLoading = true;
      state.followDone = false;
      state.followError = null;
    })
    .addCase(unfollow.fulfilled, (state, action) => {
      state.followLoading = false;
      state.followDone = true;
      _remove(state.me.Followings, { id: action.payload.UserId });
    })
    .addCase(unfollow.rejected, (state, action) => {
      state.followLoading = false;
      state.followError = action.payload;
    })
    // removeFollow
    .addCase(removeFollow.pending, (state) => {
      state.followLoading = true;
      state.followDone = false;
      state.followError = null;
    })
    .addCase(removeFollow.fulfilled, (state, action) => {
      state.followLoading = false;
      state.followDone = true;
      _remove(state.me.Followers, { id: action.payload.UserId });
    })
    .addCase(removeFollow.rejected, (state, action) => {
      state.followLoading = false;
      state.followError = action.payload;
    })
    .addDefaultCase((state) => state),
});

export default userSlice;
