export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const initialState = {
  isLoggedIn: false,
  isLoggingOut: false,
  isLoggingIn: false,
  logInErrorReason: '',
  signedUp: false,
  isSigningUp: false,
  signUpErrorReason: '',
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: '',
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: '',
      }
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: action.reason,
      }
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        user: null,
        isLoggedIn: false,
      }
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
      }
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      }
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
      }
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signedUp: false,
        isSigningUp: false,
        signUpErrorReason: action.reason,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
