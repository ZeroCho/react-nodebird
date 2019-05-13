import {
  all, call, fork, put, takeLatest, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  LOAD_FOLLOW_REQUEST,
  LOAD_FOLLOW_FAILURE,
  LOAD_FOLLOW_SUCCESS, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_REQUEST,
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
    console.error(error);
    yield put({ error, type: LOAD_USER_FAILURE });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function loadFollowAPI(userId) {
  return axios.get(`/user/${userId}/follow`, {
    withCredentials: true,
  });
}

function* loadFollow() {
  try {
    const result = yield call(loadFollowAPI);
    yield put({
      type: LOAD_FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: LOAD_FOLLOW_FAILURE });
  }
}

function* watchLoadFollow() {
  yield takeLatest(LOAD_FOLLOW_REQUEST, loadFollow);
}

function signUpAPI(data) {
  return axios.post('/user/signup', data, {
    withCredentials: true,
  });
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
    yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
    });
    yield put({
      type: LOAD_USER_REQUEST,
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
    yield put({ error, type: REMOVE_FOLLOWER_FAILURE, reason: error.response && error.response.data.reason || '서버 에러' });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga() {
  console.log('userSaga');
  yield takeEvery(LOAD_USER_REQUEST, loadUser)
    // watchLoadFollow(),
    // watchLogIn(),
    // watchLogOut(),
    // watchSignUp(),
    // watchFollow(),
    // watchUnfollow(),
    // watchRemoveFollower(),
  ;
}
