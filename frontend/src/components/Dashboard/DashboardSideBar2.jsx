import React, { Component } from "react";
import { Tabs, Tab, TabPanel, TabList, TabProvider } from "react-web-tabs";
//import styles from "./styles.css";
import styles from "./styles.css";

import store from "../../store";
import UserView from "../UserList/UserView";
import MyAppointment from "../Appointment/MyAppointment";
import Profile from "../Profile/Profile";
import { StyleSheet, css } from "aphrodite";
import Column from "antd/lib/table/Column";
import { connect } from "react-redux";
import Map from "../../common/Map";
import SearchDoctors from "../UserList/SearchDoctors";
import pwdchange from "../Login/pwdchange";
import PropTypes from "prop-types";
import newstyles from "./newstyles.css";
import { Menu, Icon, Button } from "antd";

const Styles = StyleSheet.create({
  clickMe: {
    textAlign: "center"
  },
  jumbotron: {
    //margin: "auto",
    marginTop: "2%",
    width: "80%",
    height: "auto",
    padding: 50,
    backgroundColor: "#FFFFFF",
    fontFamily: " Pacifico",
    fontSize: 18,
    color: "#000000	    ",
    borderColor: "#1A237E",
    border: "auto"
  }
});

class DashboardSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      primaryColor: "",
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    store.subscribe(() => {
      this.setState({
        isAuth: store.getState().auth.isAuth
      });
      console.log(this.state.isAuth);
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    const { auth } = this.props;
    const { type } = auth.user;
    const { user } = this.state;

    const { primaryColor } = this.state;
    return (
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

UserView.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(DashboardSideBar);
