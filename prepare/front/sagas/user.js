import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  EDIT_NICKNAME_FAILURE, EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  LOAD_FOLLOWER_FAILURE,
  LOAD_FOLLOWER_REQUEST,
  LOAD_FOLLOWER_SUCCESS,
  LOAD_FOLLOWING_FAILURE,
  LOAD_FOLLOWING_REQUEST,
  LOAD_FOLLOWING_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
} from '../reducers/user';

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : '/user', {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    console.log('saga::loadUser');
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      me: !action.data,
      data: result.data,
    });
  } catch (error) {
    console.error('loadUserFailure');
    yield put({ error, type: LOAD_USER_FAILURE });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function loadFollowerAPI(userId = 0, offset = 0) {
  return axios.get(`/user/${userId}/followers?offset=${offset}`, {
    withCredentials: true,
  });
}

function* loadFollower(action) {
  try {
    const result = yield call(loadFollowerAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: LOAD_FOLLOWER_FAILURE });
  }
}

function* watchLoadFollower() {
  yield takeLatest(LOAD_FOLLOWER_REQUEST, loadFollower);
}

function signUpAPI(data) {
  return axios.post('/user/signup', data, {
    withCredentials: true,
  });
}

function loadFollowingAPI(userId = 0, offset = 0) {
  return axios.get(`/user/${userId}/followings?offset=${offset}`, {
    withCredentials: true,
  });
}

function* loadFollowing(action) {
  try {
    const result = yield call(loadFollowingAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWING_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: LOAD_FOLLOWING_FAILURE });
  }
}

function* watchLoadFollowing() {
  yield takeLatest(LOAD_FOLLOWING_REQUEST, loadFollowing);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: SIGN_UP_FAILURE, reason: error.response && error.response.data.reason || '서버 에러' });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function logInAPI(data) {
  return axios.post('/user/login', data, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: LOG_IN_FAILURE, reason: error.response && error.response.data.reason || '서버 에러' });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function logOutAPI() {
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: LOG_OUT_FAILURE, reason: error.response && error.response.data.reason || '서버 에러' });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function followAPI(userId) {
  return axios.post(`/user/${userId}/follow`, {}, {
    withCredentials: true,
  });
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: FOLLOW_USER_FAILURE, reason: error.response && error.response.data.reason || '서버 에러' });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`, {
    withCredentials: true,
  });
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: UNFOLLOW_USER_FAILURE, reason: error.response && error.response.data.reason || '서버 에러' });
  }
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow);
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true,
  });
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      error,
      type: REMOVE_FOLLOWER_FAILURE,
      reason: error.response && error.response.data.reason || '서버 에러',
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
  return axios.patch('/user/0/nickname', { nickname }, {
    withCredentials: true,
  });
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      error,
      type: EDIT_NICKNAME_FAILURE,
      reason: error.response && error.response.data.reason || '서버 에러',
    });
  }
}

function* watchEditNickname() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLoadFollower),
    fork(watchLoadFollowing),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
