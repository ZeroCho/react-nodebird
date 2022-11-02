import { HYDRATE } from "next-redux-wrapper"; // 리덕스 서버 사이드 랜더링을 하기 위한 것
import user from './user' // user.js의 함수형 이름을 변경할 수 있다. reducer가 user로 이름 바꿔쓴 것!
import post from './post'  // 마찬가지로 post의 reducer를 post로 이름을 바꾼 것!
import { combineReducers } from "redux";
// combineReducers : reducer함수들을 합쳐주는 기능!!!
// user랑 post를 합쳐주기 위함



// Reducer - 변경서(Action)을 받고 변경사항에 따라 바꿔주도록 하는 함수
// (이전상태,액션) => 다음상태
const rootReducer = combineReducers({
    index : (state = {} , action) => {
    switch (action.type) {
        case HYDRATE: 
        console.log('HYDRATE', action)
        return {...state, ...action.payload}
    //     case "LOG_IN" :
    // return{
    //     ...state,
    //    user : {
    //     ...state.user,
    //     isLoggedIn: true,
    //     user : action.data // user객체 안에 있는 user! (6번줄)
    //         }
    //     };

    //     case "LOG_OUT" :
    //         return{
    //             ...state,
    //            user : {
    //             ...state.user,
    //             isLoggedIn: false,
    //             user : null // user객체 안에 있는 user! (6번줄)
    //                 }
    //             };
        default :
        return state
        }
    },
    post,
    user
});

export default rootReducer;
 




// =========================================================================== //
// Action - state의 내용을 아래의 내용으로 바꿔달라는 변경서
// (예시)
// const changeNickname = {
//     type : 'CHANGE_NICKNAME',
//     data: 'wonny',
// }


// 동적 액션 = 액션을 만들어주는 함수
// 만약 이름을 총 5번 수정한다고 하면 5개의 action을 만들어 줘야하는데
// 너무 불필요하니 액션을 만들어주는 함수를 만든다.
// action creator
// (예시)
// const changeNicknameFunc = (data) => {
//     return{ 
//         type : 'CHANGE_NICKNAME',
//         data,
//     }
// }

// changeNicknameFunc('wonny2')

// {
//  type : "CHANGE_NAME"
//  data : wonny2
//}

// store.dispatch(changeNickname('mighty tak'))
// =========================================================================== //