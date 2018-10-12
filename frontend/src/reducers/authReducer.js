import { AUTH_USER, NEW_USER } from "../actions/types";

const initState = {
  isAuth: false,
  user: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuth: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
