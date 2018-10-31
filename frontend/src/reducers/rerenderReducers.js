import { RERENDER_PROFILE, RERENDER_CAL } from "../actions/types";

const initState = {
  render: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case RERENDER_PROFILE:
      return {
        ...state,
        render: action.payload
      };
    case RERENDER_CAL:
      return {
        ...state,
        render: action.payload
      };
    default:
      return state;
  }
};
