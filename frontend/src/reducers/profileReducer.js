import { USER_PROFILE } from "../actions/types";

const initState = {
  userInfo: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
};
