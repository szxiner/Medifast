import { combineReducers } from "redux";
import authReducer from "./authReducer";
import rerenderReducers from "./rerenderReducers";
export default combineReducers({
  auth: authReducer,
  render: rerenderReducers
});
