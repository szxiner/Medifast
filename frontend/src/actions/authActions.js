import { AUTH_USER, STORE_USER } from "./types";

export const authUser = () => dispatch => {
  dispatch({
    type: AUTH_USER,
    payload: true
  });
};

export const storeUser = userData => dispatch => {
  const storeUser = {
    username: userData.username,
    type: userData.typeOfUser
  };
  dispatch({
    type: STORE_USER,
    payload: storeUser
  });
};
