import React, { Component } from "react";
import { Tabs, Tab, TabPanel, TabList, TabProvider } from "react-web-tabs";
//import styles from "./styles.css";
import styles from "./styles.css";
import {
  Modal,
  Button,
  Jumbotron,
  OverlayTrigger,
  popover
} from "react-bootstrap";
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
  },
  tablist: {
    fontSize: "22"
  },
  flex: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
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
    if (type === "Patient")
      return (
        <Tabs className={css(styles.flex)} defaultTab="vertical-tab-one">
          <TabList className={css(styles.tablist)}>
            <Tab tabFor="vertical-tab-one">My Profile</Tab>
            <Tab tabFor="vertical-tab-two">Show all Doctors </Tab>
            <Tab tabFor="vertical-tab-three">Insurance Information</Tab>
            <Tab tabFor="vertical-tab-four">My Appointments</Tab>
            <Tab tabFor="vertical-tab-5">Find a Doctor</Tab>
          </TabList>
          <TabPanel tabId="vertical-tab-one" component={Profile} />
          <TabPanel tabId="vertical-tab-two" component={UserView} />
          <TabPanel tabId="vertical-tab-three">TBD</TabPanel>
          <TabPanel tabId="vertical-tab-four" component={MyAppointment} />
          <TabPanel tabId="vertical-tab-5" component={SearchDoctors} />
        </Tabs>
      );
    else if (type === "Doctor")
      return (
        <Tabs defaultTab="vertical-tab-one">
          <TabList className={css(styles.tablist)}>
            <Tab tabFor="vertical-tab-one">My Profile</Tab>
            <Tab tabFor="vertical-tab-two">Show all Doctors </Tab>
            <Tab tabFor="vertical-tab-three">Insurance Information</Tab>
            <Tab tabFor="vertical-tab-four">My Appointments</Tab>
            <Tab tabFor="vertical-tab-5">Search Doctors</Tab>
          </TabList>
          <TabPanel tabId="vertical-tab-one" component={Profile} />
          <TabPanel tabId="vertical-tab-two" component={UserView} />
          <TabPanel tabId="vertical-tab-three">TBD</TabPanel>
          <TabPanel tabId="vertical-tab-four" component={MyAppointment} />
          <TabPanel tabId="vertical-tab-5" component={SearchDoctors} />
        </Tabs>
      );
    else
      return (
        <Tabs defaultTab="vertical-tab-one">
          <TabList className={css(styles.tablist)}>
            <Tab tabFor="vertical-tab-one">My Profile</Tab>
            <Tab tabFor="vertical-tab-two">Manage Claims </Tab>
            <Tab tabFor="vertical-tab-three">Statistics</Tab>
            <Tab tabFor="vertical-tab-5">Search Doctors</Tab>
          </TabList>
          <TabPanel tabId="vertical-tab-one" component={Profile} />
          <TabPanel tabId="vertical-tab-two" component={UserView} />
          <TabPanel tabId="vertical-tab-three">TBD</TabPanel>
          <TabPanel tabId="vertical-tab-5" component={SearchDoctors} />
        </Tabs>
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
