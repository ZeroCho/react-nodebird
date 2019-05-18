export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_FOLLOWER_REQUEST = 'LOAD_FOLLOWER_REQUEST';
export const LOAD_FOLLOWER_SUCCESS = 'LOAD_FOLLOWER_SUCCESS';
export const LOAD_FOLLOWER_FAILURE = 'LOAD_FOLLOWER_FAILURE';

export const LOAD_FOLLOWING_REQUEST = 'LOAD_FOLLOWING_REQUEST';
export const LOAD_FOLLOWING_SUCCESS = 'LOAD_FOLLOWING_SUCCESS';
export const LOAD_FOLLOWING_FAILURE = 'LOAD_FOLLOWING_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

export const initialState = {
  isLoggingOut: false,
  isLoggingIn: false,
  logInErrorReason: '',
  signedUp: false,
  isSigningUp: false,
  signUpErrorReason: '',
  isEditingNickname: false,
  editNicknameErrorReason: false,
  me: null,
  followingList: [],
  followerList: [],
  hasMoreFollower: true,
  hasMoreFollowing: true,
  userInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: '',
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: '',
        me: action.data,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: action.reason,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        me: null,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
      };
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
        userInfo: null,
        me: null,
      };
    }
    case LOAD_USER_SUCCESS: {
      if (action.me) {
        return {
          ...state,
          me: action.data,
        };
      }
      return {
        ...state,
        userInfo: action.data,
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signedUp: false,
        isSigningUp: true,
        signUpErrorReason: '',
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signedUp: true,
        isSigningUp: false,
        signUpErrorReason: '',
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signedUp: false,
        isSigningUp: false,
        signUpErrorReason: action.reason,
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: [...state.me.Followings, { id: action.data }],
        },
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: state.me.Followings.filter(v => v.id !== action.data),
        },
      };
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followers: state.me.Followers.filter(v => v.id !== action.data),
        },
      };
    }
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Post: [...state.me.Post, { id: action.data }],
        },
      };
    }
    case LOAD_FOLLOWER_REQUEST: {
      return {
        ...state,
        hasMoreFollower: action.offset ? state.hasMoreFollower : true,
      };
    }
    case LOAD_FOLLOWER_SUCCESS: {
      return {
        ...state,
        hasMoreFollower: action.data.length === 3,
        followerList: state.followerList.concat(action.data),
      };
    }
    case LOAD_FOLLOWING_REQUEST: {
      return {
        ...state,
        hasMoreFollowing: action.offset ? state.hasMoreFollowing : true,
      };
    }
    case LOAD_FOLLOWING_SUCCESS: {
      return {
        ...state,
        hasMoreFollowing: action.data.length === 3,
        followingList: state.followingList.concat(action.data),
      };
    }
    case EDIT_NICKNAME_REQUEST: {
      return {
        ...state,
        isEditingNickname: true,
        editNicknameErrorReason: '',
      };
    }
    case EDIT_NICKNAME_SUCCESS: {
      return {
        ...state,
        isEditingNickname: false,
        me: {
          ...state.me,
          nickname: action.data,
        },
      };
    }
    case EDIT_NICKNAME_FAILURE: {
      return {
        ...state,
        isEditingNickname: false,
        editNicknameErrorReason: action.error,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
