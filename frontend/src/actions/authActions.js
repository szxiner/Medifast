import { AUTH_USER, STORE_USER, UNAUTH_USER } from "./types";

export const authUser = () => dispatch => {
  dispatch({
    type: AUTH_USER,
    payload: true
  });
};

export const unauthUser = () => dispatch => {
  dispatch({
    type: UNAUTH_USER,
    payload: false
  });
};

export const storeUser = userData => dispatch => {
  const storeUser = {
    username: userData.username,
    type: userData.typeOfUser,
    email: userData.email
  };
  dispatch({
    type: STORE_USER,
    payload: storeUser
  });
};
