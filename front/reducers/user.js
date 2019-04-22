export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const initialState = {
  isLoggedIn: false,
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
    default:
      return {
        ...state,
      }
  }
};
