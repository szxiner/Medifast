import React from "react";
import DashboardSideBar from "./DashboardSideBar";
import DashboardMain from "./DashboardMain";
export default class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <DashboardSideBar />
        <DashboardMain />
      </div>
    );
  }
}
