import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

const initialUser = { userType: "Insurance" };

// this is the ES2015 syntax for setting a default value for state in the function parameters
function userReducer(state = initialUser, action) {
  return state;
}

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  user: userReducer
});
