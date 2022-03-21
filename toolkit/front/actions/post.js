import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from '../config/config';
import userSlice from '../reducers/user';

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const loadPosts = createAsyncThunk('post/loadPosts', async (data) => {
  const response = await axios.get(`/posts?lastId=${data?.lastId || 0}`);
  return response.data;
},
{
  condition: (data, { getState }) => {
    const { post } = getState();

    if (post.loadPostsLoading) {
      // console.warn('중복 요청 취소');
      return false;
    }
    return true;
  },
});

export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/post', data);
    thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const uploadImages = createAsyncThunk('post/uploadImages', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/images', data); // POST /post/images
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addComment = createAsyncThunk('post/addComment', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (data, thunkAPI) => {
  try {
    const response = await axios.delete(`/post/${data.postId}`); // DELETE /post/1/comment
    thunkAPI.dispatch(userSlice.actions.removePostToMe(response.data.id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadPost = createAsyncThunk('post/loadPost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/post/${data.postId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const likePost = createAsyncThunk('post/likePost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/post/${data.postId}/like`); // PATCH /post/1/like
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const unlikePost = createAsyncThunk('post/unlikePost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/post/${data.postId}/like`); // DELETE /post/1/like
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const retweet = createAsyncThunk('post/retweet', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/post/${data.postId}/retweet`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/post/${data.postId}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loadHashtagPosts = createAsyncThunk('post/loadHashtagPosts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/hashtag/${encodeURIComponent(data.hashtag)}?last=${data?.lastId || 0}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loadUserPosts = createAsyncThunk('user/loadUserPosts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/user/${data.userId}/posts?last=${data?.lastId || 0}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
