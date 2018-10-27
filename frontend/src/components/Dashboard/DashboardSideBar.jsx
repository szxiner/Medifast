import React, { Component } from "react";
import { Tabs, Tab, TabPanel, TabList, TabProvider } from "react-web-tabs";
import styles from "./styles.css";
import styles1 from "./styles1.css";

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
      primaryColor: ""
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
  render() {
    const { primaryColor } = this.state;
    //if (this.state.isAuth && user.role == Patient)
    return (
      <Tabs defaultTab="vertical-tab-one" vertical>
        <TabList>
          <Tab tabFor="vertical-tab-one">Profile</Tab>
          <Tab tabFor="vertical-tab-two">Find Doctors</Tab>
          <Tab tabFor="vertical-tab-three">Insurance Information</Tab>
          <Tab tabFor="vertical-tab-four"> Search Doctors</Tab>
          <Tab tabFor="vertical-tab-five">Chat</Tab>
          <Tab tabFor="vertical-tab-six">My Appointments</Tab>
        </TabList>
        <TabPanel tabId="vertical-tab-one">
          <p>My profile</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-two" component={UserView} />
        <TabPanel tabId="vertical-tab-three">
          <p>Insurance Info</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-four">
          <p>MAanage Claims</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-five">
          <p>Chat feature</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-six" component={MyAppointment} />
      </Tabs>
    );
  }
}
