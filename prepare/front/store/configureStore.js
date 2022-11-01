import {createWrapper} from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
    // 일반 리덕스랑 비슷하다
    const middlewares = []
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares)) // 개발용일 때

    const store = createStore(reducer, enhancer)
    // store.dispatch({   
    //     type : 'CHANGE_NICKNAME',
    //     data: 'wonny',})
    return store;
}  

const wrapper = createWrapper(configureStore,{debug: process.env.NODE_ENV === 'development',}); // debug 이 부분이 true이면 좀더 자세한 설명을 해주기 때문에 true로!

// configureStore : store를 생성한다.
// createWrapper : wrapper을 생성한다.



export default wrapper;


