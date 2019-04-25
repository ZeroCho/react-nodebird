export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const initialState = {
  isLoggedIn: false,
  signedUp: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
      }
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      }
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
      }
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signedUp: true,
      }
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
      }
    }
    default:
      return {
        ...state,
      }
  }
};
