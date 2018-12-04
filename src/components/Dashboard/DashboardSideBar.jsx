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
import Insurance from "../Insurance/Insurance";
import Billing from "../Billing/Billing";
import { Icon } from "antd";

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
  tab: {
    fontFamily: "Courgette, cursive"
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
        <Tabs className={css(styles.flex)} defaultTab="one">
          <TabList className={css(styles.tablist)}>
            <Tab tabFor="one">
              {" "}
              <Icon type="user" /> &nbsp;&nbsp; My Profile
            </Tab>
            <Tab tabFor="three">
              <Icon type="solution" />
              &nbsp; Insurance Information
            </Tab>
            <Tab tabFor="four">
              <Icon type="idcard" />
              &nbsp; My Appointments
            </Tab>
            <Tab tabFor="5">
              <Icon type="user-add" />
              &nbsp; Find a Doctor
            </Tab>
            <Tab tabFor="6">
              <Icon type="dollar" />
              &nbsp; Billing
            </Tab>
          </TabList>
          <TabPanel tabId="one" component={Profile} />
          <TabPanel tabId="three" component={Insurance} />
          <TabPanel tabId="four" component={MyAppointment} />
          <TabPanel tabId="5" component={SearchDoctors} />
          <TabPanel tabId="6" component={Billing} />
        </Tabs>
      );
    else if (type === "Doctor")
      return (
        <Tabs defaultTab="one">
          <TabList className={css(styles.tablist)}>
            <Tab tabFor="one">My Profile</Tab>
            <Tab tabFor="two">View Patients </Tab>
            {/* <Tab tabFor="three">Insurance Information</Tab> */}
            <Tab tabFor="four">My Appointments</Tab>
            <Tab tabFor="5">Search Doctors</Tab>
          </TabList>
          <TabPanel tabId="vertical-tab-one" component={Profile} />
          <TabPanel tabId="vertical-tab-two" component={UserView} />
          {/* <TabPanel tabId="vertical-tab-three">TBD</TabPanel> */}
          <TabPanel tabId="vertical-tab-four" component={MyAppointment} />
          <TabPanel tabId="vertical-tab-5" component={SearchDoctors} />
        </Tabs>
      );
    else
      return (
        <Tabs defaultTab="one">
          <TabList className={css(styles.tablist)}>
            <Tab tabFor="one">My Profile</Tab>
            <Tab tabFor="two">Manage Claims </Tab>
            <Tab tabFor="three">Statistics</Tab>
            <Tab tabFor="5">Search Doctors</Tab>
            <Tab tabFor="6">Insurance</Tab>
            <Tab tabFor="7">Billing</Tab>
          </TabList>
          <TabPanel tabId="one" component={Profile} />
          <TabPanel tabId="two" component={UserView} />
          <TabPanel tabId="three">TBD</TabPanel>
          <TabPanel tabId="5" component={SearchDoctors} />
          <TabPanel tabId="6" component={Insurance} />
          <TabPanel tabId="7" component={Billing} />
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
