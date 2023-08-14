import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducer from '../reducers';

function getServerState() {
  return typeof document !== 'undefined'
    ? JSON.parse(document.querySelector('#__NEXT_DATA__').textContent)?.props.pageProps.initialState
    : undefined;
}
const serverState = getServerState();
console.log('serverState', serverState);
const makeStore = () => configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: serverState, // SSR
});

export default createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
