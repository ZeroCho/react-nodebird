import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from '../config/config';

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async () => {
  const response = await axios.get('/user');
  return response.data;
});

export const loadUser = createAsyncThunk('user/loadUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/user/${data.userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/login', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await axios.post('/user/logout');
  return response.data;
});

export const signup = createAsyncThunk('user/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const changeNickname = createAsyncThunk('user/changeNickname', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch('/user/nickname', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const follow = createAsyncThunk('post/follow', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/user/${data.userId}/following`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const unfollow = createAsyncThunk('post/unfollow', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/user/${data.userId}/following`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removeFollow = createAsyncThunk('post/removeFollow', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/user/${data.userId}/follower`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
