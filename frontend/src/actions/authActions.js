import axios from "axios";
import { NEW_USER } from "./types";

export const authenticateUser = userData => dispatch => {
  console.log("action called");
  axios
    .post("http://127.0.0.1:8000/auth", userData)
    .then(res => {
      if (res.status === 200) {
        console.log("username and password matches");
      }
    })
    .catch(err => console.log(err));
};

export const createUser = userData => dispatch => {
  console.log("action called" + JSON.stringify(userData));
  axios
    .post("http://127.0.0.1:8000/users", userData)
    .then(userData =>
      dispatch({
        type: NEW_USER,
        payload: userData
      })
    )
    .then(res => {
      return res.status;
    });
};
