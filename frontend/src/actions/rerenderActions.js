import { RERENDER_PROFILE, RERENDER_CAL } from "./types";

export const rerenderProfile = r => dispatch => {
  dispatch({
    type: RERENDER_PROFILE,
    payload: r
  });
};

export const rerenderCal = r => dispatch => {
  dispatch({
    type: RERENDER_CAL,
    payload: r
  });
};
