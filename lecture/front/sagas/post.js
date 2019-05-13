import {
  all, fork, takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  RETWEET_REQUEST,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_FAILURE,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

function loadMainPostsAPI() {
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error,
    });
  }
}

function* watchLoadMainPosts() {
  yield takeEvery(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function loadUserPostsAPI(userId) {
  return axios.get(`/user/${userId}/posts`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error,
    });
  }
}

function* watchLoadUserPosts() {
  yield takeEvery(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function loadHashtagPostsAPI(tagName) {
  return axios.get(`/hashtag/${tagName}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeEvery(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
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
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error,
    });
  }
}

function* watchUploadImages() {
  yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function likePostAPI(postId) {
  return axios.post(`/post/${postId}/like`, {}, {
    withCredentials: true,
  });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LIKE_POST_FAILURE,
      error,
    });
  }
}

function* watchLikePost() {
  yield takeEvery(LIKE_POST_REQUEST, likePost);
}

function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true,
  });
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error,
    });
  }
}

function* watchUnlikePost() {
  yield takeEvery(UNLIKE_POST_REQUEST, unlikePost);
}

function retweetAPI(postId) {
  return axios.post(`/post/${postId}/retweet`, {}, {
    withCredentials: true,
  });
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: RETWEET_FAILURE,
      error,
    });
  }
}

function* watchRetweet() {
  yield takeEvery(RETWEET_REQUEST, retweet);
}

function loadCommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        comments: result.data,
        postId: action.data,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error,
    });
  }
}

function* watchLoadComments() {
  yield takeEvery(LOAD_COMMENTS_REQUEST, loadComments);
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        comment: result.data,
        postId: action.data.postId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error,
    });
  }
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

function removePostAPI(postId) {
  return axios.delete(`/post/${postId}`, {
    withCredentials: true,
  });
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data.postId,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      error,
    });
  }
}

function* watchRemovePost() {
  yield takeEvery(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  console.log('postSaga');
  yield takeEvery(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
    // watchLoadMainPosts(),
    // watchLoadHashtagPosts(),
    // watchLoadUserPosts(),
    // watchAddPost(),
    // watchUploadImages(),
    // watchLikePost(),
    // watchUnlikePost(),
    // watchRetweet(),
    // watchLoadComments(),
    // watchAddComment(),
    // watchRemovePost(),
}
