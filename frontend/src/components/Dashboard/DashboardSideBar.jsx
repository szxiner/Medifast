import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import store from "../../store";

const styles = StyleSheet.create({});

export default class DashboardSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // need to have log out feature
  render() {
    return <div id="sidebar-menu">Hello I am side bar</div>;
  }
}
