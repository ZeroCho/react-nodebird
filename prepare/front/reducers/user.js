import produce from 'immer';

export const LOG_IN_REQUEST = 'USER/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'USER/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'USER/LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'USER/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'USER/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'USER/LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'USER/LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'USER/LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'USER/LOAD_USER_FAILURE';

export const LOAD_FOLLOWER_REQUEST = 'USER/LOAD_FOLLOWER_REQUEST';
export const LOAD_FOLLOWER_SUCCESS = 'USER/LOAD_FOLLOWER_SUCCESS';
export const LOAD_FOLLOWER_FAILURE = 'USER/LOAD_FOLLOWER_FAILURE';

export const LOAD_FOLLOWING_REQUEST = 'USER/LOAD_FOLLOWING_REQUEST';
export const LOAD_FOLLOWING_SUCCESS = 'USER/LOAD_FOLLOWING_SUCCESS';
export const LOAD_FOLLOWING_FAILURE = 'USER/LOAD_FOLLOWING_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'USER/EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'USER/EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'USER/EDIT_NICKNAME_FAILURE';

export const SIGN_UP_REQUEST = 'USER/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'USER/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'USER/SIGN_UP_FAILURE';

export const FOLLOW_USER_REQUEST = 'USER/FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'USER/FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'USER/FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'USER/UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'USER/UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'USER/UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'USER/REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'USER/REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'USER/REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'USER/ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'USER/REMOVE_POST_OF_ME';

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
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggedIn = true;
        draft.logInErrorReason = '';
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggedIn = true;
        draft.logInErrorReason = '';
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggedIn = false;
        draft.logInErrorReason = action.reason;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        break;
      }
      case LOAD_USER_REQUEST: {
        draft.userInfo = null;
        draft.me = null;
        break;
      }
      case LOAD_USER_SUCCESS: {
        if (action.me) {
          draft.me = action.data;
        }
        draft.userInfo = action.data;
        break;
      }
      case LOAD_USER_FAILURE: {
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.signedUp = false;
        draft.isSigningUp = true;
        draft.signUpErrorReason = '';
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.signedUp = true;
        draft.isSigningUp = false;
        draft.signUpErrorReason = '';
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.signedUp = false;
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.reason;
        break;
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me.Followings.push({ id: action.data });
        break;
      }
      case UNFOLLOW_USER_SUCCESS: {
        const index = draft.me.Followings.findIndex(v => v.id === action.data);
        draft.me.Followings.splice(index, 1);
        break;
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        const index = draft.me.Followers.findIndex(v => v.id === action.data);
        draft.me.Followers.splice(index, 1);
        break;
      }
      case ADD_POST_TO_ME: {
        draft.me.Post.push({ id: action.data });
        break;
      }
      case REMOVE_POST_OF_ME: {
        const index = draft.me.Post.findIndex(v => v.id === action.data);
        draft.me.Post.splice(index, 1);
        break;
      }
      case LOAD_FOLLOWER_REQUEST: {
        draft.hasMoreFollower = action.offset ? state.hasMoreFollower : true;
        break;
      }
      case LOAD_FOLLOWER_SUCCESS: {
        draft.hasMoreFollower = action.data.length === 3;
        draft.followerList.push(action.data);
        break;
      }
      case LOAD_FOLLOWING_REQUEST: {
        draft.hasMoreFollowing = action.offset ? state.hasMoreFollowing : true;
        break;
      }
      case LOAD_FOLLOWING_SUCCESS: {
        draft.hasMoreFollowing = action.data.length === 3;
        draft.followingList.push(action.data);
        break;
      }
      case EDIT_NICKNAME_REQUEST: {
        draft.isEditingNickname = true;
        draft.editNicknameErrorReason = '';
        break;
      }
      case EDIT_NICKNAME_SUCCESS: {
        draft.isEditingNickname = false;
        draft.me.nickname = action.data;
        break;
      }
      case EDIT_NICKNAME_FAILURE: {
        draft.isEditingNickname = false;
        draft.editNicknameErrorReason = action.error;
        break;
      }
      default:
        break;
    }
  });
};
