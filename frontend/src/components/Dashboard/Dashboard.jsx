import React from "react";
import { Redirect } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";
import DashboardSideBar from "./DashboardSideBar";
import DashboardMain from "./DashboardMain";
//import DashboardSideBar from "./DashboardSideBar";
export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuth: false
    };
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
