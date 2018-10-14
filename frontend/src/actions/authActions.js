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
          payload: userData.username
        });
      } else {
        console.log("User name and password does not match...");
      }
    })
    .catch(err => console.log(err));
};

export const createUser = userData => dispatch => {
  console.log(userData);
  axios.post("http://127.0.0.1:8000/users-api/", userData).then(res => {
    if (res.status === 201) {
      console.log("User created!");
    } else {
      console.log("Username already exist...");
    }
  });

  dispatch({
    type: AUTH_USER,
    payload: userData.username
  });
};
