import { HYDRATE } from "next-redux-wrapper";


// 초기 state
const initialState = {
    user : {
        isLoggedIn : false,
        user: null,
        signUpData: {},
        loginData: {}
    },

    post : {
        mainPosts: []
    }
};


// login Action Creator
export const loginAction = (data) => {
    return{
        type: 'LOG_IN',
        data,
    }
}

export const logOutAction = (data) => {
    return{
        type: 'LOG_OUT',
        data,
    }
}


// Reducer - 변경서(Action)을 받고 변경사항에 따라 바꿔주도록 하는 함수
// (이전상태,액션) => 다음상태
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: 
        console.log('HYDRATE', action)
        return {...state, ...action.payload}
        case "LOG_IN" :
    return{
        ...state,
       user : {
        ...state.user,
        isLoggedIn: true,
        user : action.data // user객체 안에 있는 user! (6번줄)
            }
        };

        case "LOG_OUT" :
            return{
                ...state,
               user : {
                ...state.user,
                isLoggedIn: false,
                user : null // user객체 안에 있는 user! (6번줄)
                    }
                };
                default :
                return state
    }
}

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