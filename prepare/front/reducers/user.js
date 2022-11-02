export const initialState ={
    isLoggedIn : false,
    user: null, // 나중에 여기에 {id,password} 값이 들어오고, logout하면 null값이 다시 들어온다.
    signUpData: {},
    loginData: {}
}

// login Action Creator
// user파일에 오게 된 것은 로그인아웃이 유저와 관련된 것이기 때문이다.
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


const reducer = (state = initialState , action) => {
    switch(action.type) {
        case "LOG_IN" :
            return{
                ...state,
                isLoggedIn: true,
                user : action.data // user객체 안에 있는 user! (6번줄) user = null 이라고 적혔던 부분
                };
        
                case "LOG_OUT" :
                    return{
                        ...state,
                        isLoggedIn: false,
                        user : null // user객체 안에 있는 user! (6번줄)
                        };
        default : 
        return state;
    }
}

export default reducer;


