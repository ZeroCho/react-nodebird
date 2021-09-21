import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export function retweetAPI(data: number) {
  return axios.post(`/post/${data}/retweet`).then((response) => response.data);
}

export function uploadImagesAPI<T>(data: FormData) {
  return axios.post<T>('/post/images', data).then((response) => response.data);
}

export function likePostAPI(data: number) {
  return axios.patch(`/post/${data}/like`).then((response) => response.data);
}

export function unlikePostAPI(data: number) {
  return axios.delete(`/post/${data}/like`).then((response) => response.data);
}

export function loadPostAPI(data: number) {
  return axios.get(`/post/${data}`).then((response) => response.data);
}

export function loadHashtagPostsAPI(data: string, lastId?: number) {
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`).then((response) => response.data);
}

export function loadUserPostsAPI(data: number, lastId?: number) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`).then((response) => response.data);
}

export function loadPostsAPI(lastId?: number) {
  return axios.get(`/posts?lastId=${lastId || 0}`).then((response) => response.data);
}

export function addPostAPI(data: FormData) {
  return axios.post('/post', data).then((response) => response.data);
}

export function updatePostAPI(data: { PostId: number; content: string }) {
  return axios.patch(`/post/${data.PostId}`, data).then((response) => response.data);
}

export function removePostAPI(data: number) {
  return axios.delete(`/post/${data}`).then((response) => response.data);
}

export function addCommentAPI(data: { postId: number; content: string; userId: number }) {
  return axios.post(`/post/${data.postId}/comment`, data).then((response) => response.data); // POST /post/1/comment
}
