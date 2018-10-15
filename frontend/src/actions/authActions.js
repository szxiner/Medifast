import axios from "axios";
import { AUTH_USER } from "./types";

export const authenticateUser = userData => dispatch => {
  axios
    .post("http://127.0.0.1:8000/auth", userData)
    .then(res => {
      if (res.status === 200) {
        console.log("Login success!");
        dispatch({
          type: AUTH_USER,
          payload: userData.typeOfUser
        });
      } else {
        console.log("User name and password does not match...");
      }
    })
    .catch(err => console.log(err));
};

export const createUser = userData => dispatch => {
  dispatch({
    type: AUTH_USER,
    payload: userData.typeOfUser
  });
};
