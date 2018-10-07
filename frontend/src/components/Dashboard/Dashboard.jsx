import React from "react";
import { Redirect } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";
import DashboardSideBar from "./DashboardSideBar";
import DashboardMain from "./DashboardMain";
import store from "../../store";
export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuth: false
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        isAuth: store.getState().auth.isAuth
      });
    });
  }

  render() {
    // if (!this.state.isAuth) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div>
        <DashboardMenu />
        <DashboardSideBar />
        {/* <DashboardMain /> */}
      </div>
    );
  }
}
