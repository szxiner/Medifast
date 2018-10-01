import axios from "axios";
import { AUTH_USER, NEW_USER } from "./types";
import { Redirect } from "react-router-dom";

export const authenticateUser = userData => dispatch => {
  console.log("action called");
  axios
    .post("http://127.0.0.1:8000/auth", userData)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: AUTH_USER,
          payload: true
        });
      }
    })
    .catch(err => console.log(err));
};

export const createUser = userData => dispatch => {
  console.log("action called" + JSON.stringify(userData));
  axios
    .post("http://127.0.0.1:8000/users", userData)
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
