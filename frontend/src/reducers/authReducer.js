import { AUTH_USER, NEW_USER } from "../actions/types";

const initState = {
  // represent user info
  item: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        item: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
};
