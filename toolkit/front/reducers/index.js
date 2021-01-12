import { combineReducers } from 'redux';

import userSlice from './user';
import postSlice from './post';

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;
