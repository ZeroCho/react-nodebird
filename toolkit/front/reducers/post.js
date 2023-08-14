import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';

export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

const loadPostsThrottle = async (lastId) => {
  const response = await axios.get(`/posts?lastId=${lastId || 0}`);
  return response.data;
};
export const loadPosts = createAsyncThunk('post/loadPosts', _.throttle(loadPostsThrottle, 5000));

const loadHashtagPostsThrottle = async ({ lastId, tag }) => {
  const response = await axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId || 0}`);
  return response.data;
};
export const loadHashtagPosts = createAsyncThunk('post/loadHashtagPosts', _.throttle(loadHashtagPostsThrottle, 5000));

const loadUserPostsThrottle = async ({ lastId, id }) => {
  const response = await axios.get(`/user/${id}/posts?lastId=${lastId || 0}`);
  return response.data;
};
export const loadUserPosts = createAsyncThunk('post/loadUserPosts', _.throttle(loadUserPostsThrottle, 5000));

export const retweet = createAsyncThunk('post/retweet', async (data) => {
  const response = await axios.post(`/post/${data}/retweet`);
  return response.data;
});

export const uploadImage = createAsyncThunk('post/uploadImage', async (data) => {
  const response = await axios.post('/post/images', data);
  return response.data;
});

export const likePost = createAsyncThunk('post/likePost', async (data) => {
  const response = await axios.patch(`/post/${data}/like`);
  return response.data;
});

export const unlikePost = createAsyncThunk('post/unlikePost', async (data) => {
  const response = await axios.delete(`/post/${data}/like`);
  return response.data;
});

export const loadPost = createAsyncThunk('post/loadPost', async (data) => {
  const response = await axios.get(`/post/${data}`);
  return response.data;
});

export const addPost = createAsyncThunk('post/addPost', async (data) => {
  const response = await axios.post('/post', data);
  return response.data;
});

export const updatePost = createAsyncThunk('post/updatePost', async (data) => {
  const response = await axios.patch(`/post/${data.PostId}`, data);
  return response.data;
});

export const removePost = createAsyncThunk('post/removePost', async (data) => {
  const response = await axios.delete(`/post/${data}`);
  return response.data;
});

export const addComment = createAsyncThunk('post/addComment', async (data) => {
  const response = await axios.post(`/post/${data.postId}/comment`, data); //
  return response.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    removeImage(state, action) {
      state.imagePaths = state.imagePaths.filter((v, i) => i !== action.payload);
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.post,
    }))
    .addCase(retweet.pending, (state, action) => {
      state.retweetLoading = true;
      state.retweetDone = false;
      state.retweetError = null;
    })
    .addCase(retweet.fulfilled, (state, action) => {
      state.retweetLoading = false;
      state.retweetDone = true;
      state.mainPosts.unshift(action.payload);
    })
    .addCase(retweet.rejected, (state, action) => {
      state.retweetLoading = false;
      state.retweetError = action.error;
    })
    .addCase(uploadImage.pending, (draft, action) => {
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
    })
    .addCase(uploadImage.fulfilled, (draft, action) => {
      draft.imagePaths = draft.imagePaths.concat(action.payload);
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
    })
    .addCase(uploadImage.rejected, (draft, action) => {
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.error;
    })
    .addCase(likePost.pending, (draft, action) => {
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
    })
    .addCase(likePost.fulfilled, (draft, action) => {
      const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
      post.Likers.push({ id: action.payload.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
    })
    .addCase(likePost.rejected, (draft, action) => {
      draft.likePostLoading = false;
      draft.likePostError = action.error;
    })
    .addCase(unlikePost.pending, (draft, action) => {
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
    })
    .addCase(unlikePost.fulfilled, (draft, action) => {
      const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== action.payload.UserId);
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
    })
    .addCase(unlikePost.rejected, (draft, action) => {
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
    })
    .addCase(loadPost.pending, (draft, action) => {
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
    })
    .addCase(loadPost.fulfilled, (draft, action) => {
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      draft.singlePost = action.payload;
    })
    .addCase(loadPost.rejected, (draft, action) => {
      draft.loadPostLoading = false;
      draft.loadPostError = action.error;
    })
    .addCase(loadPosts.pending, (state, action) => {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    })
    .addCase(loadPosts.fulfilled, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = action.payload.length === 10;
    })
    .addCase(loadPosts.rejected, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    })
    .addCase(loadUserPosts.pending, (state, action) => {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    })
    .addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = action.payload.length === 10;
    })
    .addCase(loadUserPosts.rejected, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    })
    .addCase(loadHashtagPosts.pending, (state, action) => {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    })
    .addCase(loadHashtagPosts.fulfilled, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.payload);
      state.hasMorePosts = action.payload.length === 10;
    })
    .addCase(loadHashtagPosts.rejected, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    })
    .addCase(addPost.pending, (draft, action) => {
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
    })
    .addCase(addPost.fulfilled, (draft, action) => {
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.payload);
      draft.imagePaths = [];
    })
    .addCase(addPost.rejected, (draft, action) => {
      draft.addPostLoading = false;
      draft.addPostError = action.error;
    })
    .addCase(updatePost.pending, (draft, action) => {
      draft.updatePostLoading = true;
      draft.updatePostDone = false;
      draft.updatePostError = null;
    })
    .addCase(updatePost.fulfilled, (draft, action) => {
      draft.updatePostLoading = false;
      draft.updatePostDone = true;
      draft.mainPosts.find((v) => v.id === action.payload.PostId).content = action.payload.content;
    })
    .addCase(updatePost.rejected, (draft, action) => {
      draft.updatePostLoading = false;
      draft.updatePostError = action.error;
    })
    .addCase(removePost.pending, (draft, action) => {
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
    })
    .addCase(removePost.fulfilled, (draft, action) => {
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.payload.PostId);
    })
    .addCase(removePost.rejected, (draft, action) => {
      draft.removePostLoading = false;
      draft.removePostError = action.error;
    })
    .addCase(addComment.pending, (draft, action) => {
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
    })
    .addCase(addComment.fulfilled, (draft, action) => {
      const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
      console.log('draft', draft, 'post', post, 'Comments', post.Coments);
      post.Comments.unshift(action.payload);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
    })
    .addCase(addComment.rejected, (draft, action) => {
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
    })
    .addDefaultCase((state) => state),
});

export default postSlice;
