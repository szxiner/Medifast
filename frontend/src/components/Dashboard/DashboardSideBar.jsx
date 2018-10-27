import React, { Component } from "react";
import { Tabs, Tab, TabPanel, TabList, TabProvider } from "react-web-tabs";
import styles from "./styles.css";
import store from "../../store";
import UserView from "../UserList/UserView";
import MyAppointment from "../Appointment/MyAppointment";
import Profile from "../Profile/Profile";
import { StyleSheet, css } from "aphrodite";

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
      primaryColor: true
    };
    store.subscribe(() => {
      this.setState({
        isAuth: store.getState().auth.isAuth
      });
      console.log(this.state.isAuth);
    });
  }
  onClick = () => {
    this.setState({ primaryColor: !this.state.primaryColor });
  };

  render() {
    const { primaryColor } = this.state;

    //if (this.state.isAuth && user.role == Patient)
    return (
      <Tabs defaultTab="vertical-tab-one" vertical>
        <TabList>
          <Tab tabFor="vertical-tab-one">Profile</Tab>
          <Tab tabFor="vertical-tab-two">Find Doctors</Tab>
          <Tab tabFor="vertical-tab-three">Insurance Information</Tab>
          <Tab tabFor="vertical-tab-four">Claims</Tab>
          <Tab tabFor="vertical-tab-five">Chat</Tab>
          <Tab tabFor="vertical-tab-six">My Appointments</Tab>
          <Tab tabFor="vertical-tab-seven">TBD</Tab>
          <Tab tabFor="vertical-tab-eight">TBD</Tab>
          <Tab tabFor="vertical-tab-nine">TBD</Tab>
          <Tab tabFor="vertical-tab-ten">TBD</Tab>
          <Tab tabFor="vertical-tab-11">TBD</Tab>
          <Tab tabFor="vertical-tab-12">TBD</Tab>
          <Tab tabFor="vertical-tab-13">TBD</Tab>
          <Tab tabFor="vertical-tab-14">TBD</Tab>
          <Tab tabFor="vertical-tab-15">TBD</Tab>
          <Tab tabFor="vertical-tab-16">TBD</Tab>
          <Tab tabFor="vertical-tab-17">TBD</Tab>
          <Tab tabFor="vertical-tab-18">TBD</Tab>
        </TabList>
        <TabPanel tabId="vertical-tab-one" component={Profile} />
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
        <TabPanel tabId="vertical-tab-seven">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-eight">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-nine">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-ten">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-11">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-12">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-13">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-14">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-15">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-16">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-17">
          <p>Will be coming up soon!!</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-18">
          <p>Will be coming up soon!!</p>
        </TabPanel>
      </Tabs>
    );
    //Make the page responsive based on the user logged in.
    /*
      elseif(this.state.isAuth && user.role == doctor);
    return (
      <Tabs defaultTab="vertical-tab-one" vertical>
        <TabList>
          <Tab tabFor="vertical-tab-one">Profile</Tab>
          <Tab tabFor="vertical-tab-two">Find Doctors</Tab>
          <Tab tabFor="vertical-tab-three">Insurance Information</Tab>
          <Tab tabFor="vertical-tab-four">Claims</Tab>
          <Tab tabFor="vertical-tab-five">Chat</Tab>
          <Tab tabFor="vertical-tab-six">Appointments</Tab>
          <Tab tabFor="vertical-tab-seven">TBD</Tab>
          <Tab tabFor="vertical-tab-eight">TBD</Tab>
          <Tab tabFor="vertical-tab-nine">TBD</Tab>
          <Tab tabFor="vertical-tab-ten">TBD</Tab>
          <Tab tabFor="vertical-tab-12">TBD</Tab>
          <Tab tabFor="vertical-tab-13">TBD</Tab>
          <Tab tabFor="vertical-tab-14">TBD</Tab>
          <Tab tabFor="vertical-tab-15">TBD</Tab>
          <Tab tabFor="vertical-tab-16">TBD</Tab>
          <Tab tabFor="vertical-tab-17">TBD</Tab>
          <Tab tabFor="vertical-tab-18">TBD</Tab>
          <Tab tabFor="vertical-tab-19">TBD</Tab>
        </TabList>
        <TabPanel tabId="vertical-tab-one">
          <p>Tab 1 content</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-two">
          <p>Tab 2 content</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-three">
          <p>Tab 3 content</p>
        </TabPanel>
      </Tabs>
    );
    elseif(this.state.isAuth && user.role == "Insurance Provider");
    return (
      <Tabs defaultTab="vertical-tab-one" vertical>
        <TabList>
          <Tab tabFor="vertical-tab-one">Profile</Tab>
          <Tab tabFor="vertical-tab-two">Find Doctors</Tab>
          <Tab tabFor="vertical-tab-three">Insurance Information</Tab>
          <Tab tabFor="vertical-tab-four">Claims</Tab>
          <Tab tabFor="vertical-tab-five">Chat</Tab>
          <Tab tabFor="vertical-tab-six">Appointments</Tab>
          <Tab tabFor="vertical-tab-seven">TBD</Tab>
          <Tab tabFor="vertical-tab-eight">TBD</Tab>
          <Tab tabFor="vertical-tab-nine">TBD</Tab>
          <Tab tabFor="vertical-tab-ten">TBD</Tab>
          <Tab tabFor="vertical-tab-12">TBD</Tab>
          <Tab tabFor="vertical-tab-13">TBD</Tab>
          <Tab tabFor="vertical-tab-14">TBD</Tab>
          <Tab tabFor="vertical-tab-15">TBD</Tab>
          <Tab tabFor="vertical-tab-16">TBD</Tab>
          <Tab tabFor="vertical-tab-17">TBD</Tab>
          <Tab tabFor="vertical-tab-18">TBD</Tab>
          <Tab tabFor="vertical-tab-19">TBD</Tab>
        </TabList>
        <TabPanel tabId="vertical-tab-one">
          <p>Tab 1 content</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-two">
          <p>Tab 2 content</p>
        </TabPanel>
        <TabPanel tabId="vertical-tab-three">
          <p>Tab 3 content</p>
        </TabPanel>
      </Tabs>
    );
    */
  }
}
