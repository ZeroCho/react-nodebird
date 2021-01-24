import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const isDev = process.env.NODE_ENV === 'development';
const createStore = () => {
  const middleware = getDefaultMiddleware();
  if (isDev) {
    middleware.push(logger);
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

export default wrapper;
