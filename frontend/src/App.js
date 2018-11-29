import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import LandingNavbar from "./components/Layout/LandingNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import GoogleCallback from "./components/Login/GoogleCallback";
import GoogleFinishRegister from "./components/Login/GoogleFinishRegister";

import store from "./store";
import history from "./history";
import { StyleSheet, css } from "aphrodite";
import TwoFactor from "./components/Login/TwoFactor";
import ResetPassword from "./components/Login/ResetPassword";
import SearchDoctors from "./components/UserList/SearchDoctors";
import ResetOption from "./components/Login/ResetOption";
import EmailReset from "./components/Login/EmailReset";
import pwdchange from "./components/Login/pwdchange";
import FooterBar from "./components/Footer/FooterBar";
import Billing from "./components/Billing/Billing";
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
              <Route
                exact
                path="/completeRegistration"
                component={GoogleFinishRegister}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/2fa" component={TwoFactor} />
              <Route path="/callback/:accessToken" component={GoogleCallback} />
              <Route exact path="/ResetPassword" component={ResetPassword} />
              <Route exact path="/SearchDoctors" component={SearchDoctors} />
              <Route exact path="/ResetOption" component={ResetOption} />
              <Route exact path="/EmailReset" component={EmailReset} />
              <Route exact path="/pwdchange" component={pwdchange} />
              <Route exact path="/Billing" component={Billing} />
              {/* <Route exact path="/footer" component={footer} /> */}
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            {/* <FooterBar /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
