import React, { Component } from "react";
import { Tabs, Tab, TabPanel, TabList, TabProvider } from "react-web-tabs";
import styles from "./styles.css";
import styles1 from "./styles1.css";
import { Menu, Icon, Button } from "antd";
import store from "../../store";
import UserView from "../UserList/UserView";
import MyAppointment from "../Appointment/MyAppointment";
import { StyleSheet, css } from "aphrodite";
import Column from "antd/lib/table/Column";

const stylesclick = StyleSheet.create({
  clickMe: {
    textAlign: "center"
  }
});

export default class DashboardSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      primaryColor: "",
      collapsed: false
    };
    store.subscribe(() => {
      this.setState({
        isAuth: store.getState().auth.isAuth
      });
      console.log(this.state.isAuth);
    });
  }
  /*
  componentWillMount(primaryColor) {
    if (primaryColor === "Blue") {
      require("styles.css");
    }
    if (primaryColor === "Yellow") {
      require("styles1.css");
    }
  }
*/

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { primaryColor } = this.state;
    const SubMenu = Menu.SubMenu;

    //if (this.state.isAuth && user.role == Patient)
    return (
      <div style={{ width: 240 }}>
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
          theme="dark"
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
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
