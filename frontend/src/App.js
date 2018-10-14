import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingNavbar from "./components/Layout/LandingNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import UserList from "./components/UserList/UserList";
import store from "./store";
import { StyleSheet, css } from "aphrodite";
import { ForgotPwd } from "./components/ForgotPwd/ForgotPwd";

const styles = StyleSheet.create({
  app: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    store.subscribe(() => {
      const isAuth = store.getState().auth.isAuth;
      console.log(isAuth);
    });
  }
  render() {
    return (
      // Provider glues react and redux together
      <Provider store={store}>
        <Router>
          <div className={css(styles.app)}>
            <LandingNavbar />
            <Route exact path="/" component={Landing} />
            <div className="componentRoutings">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <Route exact path="/user-list" component={UserList} />
              </Switch>
              <Switch>
                <Route exact path="/forgotpassword" component={ForgotPwd} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
