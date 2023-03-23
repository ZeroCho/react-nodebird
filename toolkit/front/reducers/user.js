import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  userInfo: null,
};

export const logIn = createAsyncThunk('user/logIn', async (data) => {
  const response = await axios.post('/user/login', data);
  return response.data;
});
export const removeFollower = createAsyncThunk('user/removeFollower', async (data) => {
  const response = await axios.delete(`/user/follower/${data}`);
  return response.data;
});

export const loadFollowings = createAsyncThunk('user/loadFollowings', async (data) => {
  const response = await axios.get('/user/followings', data);
  return response.data;
});

export const loadFollowers = createAsyncThunk('user/loadFollowers', async (data) => {
  const response = await axios.get('/user/followers', data);
  return response.data;
});

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async (data) => {
  const response = await axios.get('/user');
  return response.data;
});

export const loadUser = createAsyncThunk('user/loadUser', async (data) => {
  const response = await axios.get(`/user/${data}`);
  return response.data;
});

export const follow = createAsyncThunk('user/follow', async (data) => {
  const response = await axios.patch(`/user/${data}/follow`);
  return response.data;
});

export const unfollow = createAsyncThunk('user/unfollow', async (data) => {
  const response = await axios.delete(`/user/${data}/follow`);
  return response.data;
});

export const logout = createAsyncThunk('user/logout', async (data) => {
  const response = await axios.post('/user/logout');
  return response.data;
});

export const signup = createAsyncThunk('user/signup', async (data) => {
  const response = await axios.post('/user', data);
  return response.data;
});

export const changeNickname = createAsyncThunk('user/changeNickname', async (data) => {
  const response = await axios.patch('/user/nickname', { nickname: data });
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPostToMe(draft, action) {
      draft.me.Posts.unshift({ id: action.data });
    },
    removePostOfMe(draft, action) {
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
    },
  },
  extraReducers: (builder) => builder
    .addCase([HYDRATE], (state, action) => ({
      ...state,
      ...action.payload.user,
    }))
    .addCase(logIn.pending, (state, action) => {
      state.logInLoading = true;
      state.logInError = null;
      state.logInDone = false;
    })
    .addCase(logIn.fulfilled, (state, action) => {
      state.logInLoading = false;
      state.me = action.payload;
      state.logInDone = true;
    })
    .addCase(logIn.rejected, (state, action) => {
      state.logInLoading = false;
      state.logInError = action.error.message;
    })
    .addCase(removeFollower.pending, (state, action) => {
      state.removeFollowerLoading = true;
      state.removeFollowerError = null;
      state.removeFollowerDone = false;
    })
    .addCase(removeFollower.fulfilled, (state, action) => {
      state.removeFollowerLoading = false;
      state.me.Followers = state.me.Followers.filter((v) => v.id !== action.data.UserId);
      state.removeFollowerDone = true;
    })
    .addCase(removeFollower.rejected, (draft, action) => {
      draft.removeFollowerLoading = false;
      draft.removeFollowerError = action.error;
    })
    .addCase(loadFollowings.pending, (draft, action) => {
      draft.loadFollowingsLoading = true;
      draft.loadFollowingsError = null;
      draft.loadFollowingsDone = false;
    })
    .addCase(loadFollowings.fulfilled, (draft, action) => {
      draft.loadFollowingsLoading = false;
      draft.me.Followings = action.data;
      draft.loadFollowingsDone = true;
    })
    .addCase(loadFollowings.rejected, (draft, action) => {
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsError = action.error;
    })
    .addCase(loadFollowers.pending, (draft, action) => {
      draft.loadFollowersLoading = true;
      draft.loadFollowersError = null;
      draft.loadFollowersDone = false;
    })
    .addCase(loadFollowers.fulfilled, (draft, action) => {
      draft.loadFollowersLoading = false;
      draft.me.Followers = action.data;
      draft.loadFollowersDone = true;
    })
    .addCase(loadFollowers.rejected, (draft, action) => {
      draft.loadFollowersLoading = false;
      draft.loadFollowersError = action.error;
    })
    .addCase(loadMyInfo.pending, (draft, action) => {
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
    })
    .addCase(loadMyInfo.fulfilled, (draft, action) => {
      draft.loadMyInfoLoading = false;
      draft.me = action.data;
      draft.loadMyInfoDone = true;
    })
    .addCase(loadMyInfo.rejected, (draft, action) => {
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
    })
    .addCase(loadUser.pending, (draft, action) => {
      draft.loadUserLoading = true;
      draft.loadUserError = null;
      draft.loadUserDone = false;
    })
    .addCase(loadUser.fulfilled, (draft, action) => {
      draft.loadUserLoading = false;
      draft.userInfo = action.data;
      draft.loadUserDone = true;
    })
    .addCase(loadUser.rejected, (draft, action) => {
      draft.loadUserLoading = false;
      draft.loadUserError = action.error;
    })
    .addCase(follow.pending, (draft, action) => {
      draft.followLoading = true;
      draft.followError = null;
      draft.followDone = false;
    })
    .addCase(follow.fulfilled, (draft, action) => {
      draft.followLoading = false;
      draft.me.Followings.push({ id: action.data.UserId });
      draft.followDone = true;
    })
    .addCase(follow.rejected, (draft, action) => {
      draft.followLoading = false;
      draft.followError = action.error;
    })
    .addCase(unfollow.pending, (draft, action) => {
      draft.unfollowLoading = true;
      draft.unfollowError = null;
      draft.unfollowDone = false;
    })
    .addCase(unfollow.fulfilled, (draft, action) => {
      draft.unfollowLoading = false;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
      draft.unfollowDone = true;
    })
    .addCase(unfollow.rejected, (draft, action) => {
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
    })
    .addCase(logout.pending, (draft, action) => {
      draft.logOutLoading = true;
      draft.logOutError = null;
      draft.logOutDone = false;
    })
    .addCase(logout.fulfilled, (draft, action) => {
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
    })
    .addCase(logout.rejected, (draft, action) => {
      draft.logOutLoading = false;
      draft.logOutError = action.error;
    })
    .addCase(signup.pending, (draft, action) => {
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
    })
    .addCase(signup.fulfilled, (draft, action) => {
      draft.signUpLoading = false;
      draft.signUpDone = true;
    })
    .addCase(signup.rejected, (draft, action) => {
      draft.signUpLoading = false;
      draft.signUpError = action.error;
    })
    .addCase(changeNickname.pending, (draft, action) => {
      draft.changeNicknameLoading = true;
      draft.changeNicknameError = null;
      draft.changeNicknameDone = false;
    })
    .addCase(changeNickname.fulfilled, (draft, action) => {
      draft.me.nickname = action.data.nickname;
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
    })
    .addCase(changeNickname.rejected, (draft, action) => {
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
    })
    .addDefaultCase((state) => state),
});

export default userSlice;
