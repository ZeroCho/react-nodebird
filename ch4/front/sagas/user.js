import { all, delay, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분 * 붙이지 말 것
  return axios.post('/login');
}

function* login() {
  try {
    // yield call(loginAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* signUp() {
  try {
    // yield call(signUpAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}


export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
