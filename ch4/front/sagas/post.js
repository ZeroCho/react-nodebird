import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../reducers/post';
import { REMOVE_POST_OF_ME } from '../reducers/user';

function addPostAPI() {

}

function* addPost() {
  try {
    // const result = yield call(addPostAPI)
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI() {

}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI)
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function removePostAPI(data) {
  return axios.delete('/api/post', data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
