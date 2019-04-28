import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS
} from '../reducers/post';

function loadMainPostsAPI() {
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error,
    })
  }

}

function* watchLoadMainPosts() {
  yield takeEvery(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function addPostAPI(data) {
  return axios.post('/post', data, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error,
    })
  }

}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchAddPost),
  ]);
}
