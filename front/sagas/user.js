import { all, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from '../reducers/user';

function loadUserAPI() {
  return axios.get(`/user/my/reviews`, {

  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      result: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ error, type: LOAD_USER_FAILURE });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
  ]);
}