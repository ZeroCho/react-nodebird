import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import userSlice from './user';
import postSlice from './post';

// (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user: userSlice.reducer,
        post: postSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
