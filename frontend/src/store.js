import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initState = {};

const middleware = [thunk];

// const reducer = combineReducers({});

// const store = (window.devToolsExtension
//   ? window.devToolsExtension()(createStore)
//   : createStore)(reducer);

const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
