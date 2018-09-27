import axios from "axios";
import { AUTH_USER, NEW_USER } from "./types";

export const authenticateUser = userData => dispatch => {
  console.log("action called");
  dispatch({
    type: AUTH_USER,
    payload: userData
  });
};

export const createUser = userData => dispatch => {
  console.log("action called" + JSON.stringify(userData));
  axios
    .post("http://127.0.0.1:8000/users/", userData)
    .then(res => console.log(res))
    .then(userData => {
      {
        dispatch({
          type: NEW_USER,
          payload: userData
        });
      }
    });
};
