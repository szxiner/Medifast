import React from "react";
import DashboardSideBar from "./DashboardSideBar";
import DashboardMain from "./DashboardMain";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  dashboard: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});
export default class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <div className={css(styles.dashboard)}>
        <DashboardSideBar />
        {/* <DashboardMain /> */}
      </div>
    );
  }
}
