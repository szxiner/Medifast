import { createStore, combineReducers } from "redux";

const reducer = combineReducers({});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;
