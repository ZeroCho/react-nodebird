import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user from './user';
import post from './post';
import { backAddress } from '../server';

axios.defaults.baseURL = `${backAddress}/api`;

export default function* rootSaga() {
  console.log('rootSaga');
  yield all([
    fork(user),
    fork(post),
  ]);
}
