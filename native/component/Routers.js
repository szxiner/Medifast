import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";

import Login from "./Auth/Login";
import Register from "./Auth/Register";

export class Routers extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login" initial={true} />
          <Scene key="register" component={Register} title="Register" />
        </Stack>
      </Router>
    );
  }
}

export default Routers;
