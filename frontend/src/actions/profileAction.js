import axios from "axios";
import { USER_PROFILE } from "./types";

export const getUserProfile = () => dispatch => {
  axios
    .post("http://127.0.0.1:8000/auth", userData)
    .then(res => {
      if (res.status === 200) {
        console.log("Login success!");
        dispatch({
          type: AUTH_USER,
          payload: true
        });
      } else {
        console.log("User name and password does not match...");
      }
    })
    .catch(err => console.log(err));
};
