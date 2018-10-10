import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingNavbar from "./components/Layout/LandingNavbar";
import DashboardMain from "./components/Dashboard/DashboardMain";
import UserList from "./components/UserList/UserList";
import store from "./store";

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
          <div className="App">
            <LandingNavbar />
            <Route exact path="/" component={Landing} />
            <div className="componentRoutings">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <Route exact path="/dashboard" component={DashboardMain} />
              </Switch>
              <Switch>
                <Route exact path="/user-list" component={UserList} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
