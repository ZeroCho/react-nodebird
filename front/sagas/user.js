import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

function loadUserAPI() {
  return axios.get(`/user`, {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: LOAD_USER_FAILURE });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function signUpAPI(data) {
  return axios.post(`/user/signup`, data, {
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
  return axios.post(`/user/login`, data, {
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

function logOutAPI(data) {
  return axios.post(`/user/logout`, data, {
    withCredentials: true,
  });
}

function* logOut(action) {
  try {
    yield call(logOutAPI, action.data);
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

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}