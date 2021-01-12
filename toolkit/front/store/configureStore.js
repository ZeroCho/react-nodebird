import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from '../reducers';

function getServerState() {
  return typeof document !== 'undefined'
    ? JSON.parse(document.querySelector('#__NEXT_DATA__').textContent)?.props.pageProps.initialState
    : undefined;
}
const serverState = getServerState();
console.log('serverState', serverState);
export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware()],
  preloadedState: serverState, // SSR
});
