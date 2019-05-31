import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user from './user';
import post from './post';

const backAddress = process.env.NODE_ENV === 'production' ? 'http://api.nodebird.com' : 'http://localhost:3065';
axios.defaults.baseURL = `${backAddress}/api`;

export default function* rootSaga() {
  console.log('rootSaga');
  yield all([
    fork(user),
    fork(post),
  ]);
}
