import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import LandingNavbar from "./components/Layout/LandingNavbar";
import Dashboard from "./components/Dashboard/Dashboard";

import store from "./store";
import history from "./history";
import { StyleSheet, css } from "aphrodite";
import TwoFactor from "./components/Login/TwoFactor";

const styles = StyleSheet.create({
  app: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

class App extends React.Component {
  render() {
    return (
      // Provider glues react and redux together
      <Provider store={store}>
        <Router history={history}>
          <div className={css(styles.app)}>
            <LandingNavbar />
            <Route exact path="/" component={Landing} />
            <div className="componentRoutings">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/2fa" component={TwoFactor} />

              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
