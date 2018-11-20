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
  tablist:{
    fontSize:"22",
    
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
    return (
      <Tabs defaultTab="vertical-tab-one" vertical>
        <TabList className={css(styles.tablist)}>
          <Tab tabFor="vertical-tab-one">Profile</Tab>
          <Tab tabFor="vertical-tab-two">
            {type === "Patient"
              ? "Show all Doctors"
              : type === "Doctor"
              ? "View your Patients"
              : "View Patients and Doctors"}
          </Tab>
          <Tab tabFor="vertical-tab-three">
            {type === "Patient"
              ? "Insurance Information"
              : type === "Doctor"
              ? "Insurance Information"
              : "My Information"}
          </Tab>
          <Tab tabFor="vertical-tab-four">
            {" "}
            {type === "Patient"
              ? "My Appointments"
              : type === "Doctor"
              ? "My Appointments"
              : "Account Settings"}
          </Tab>

          <Tab tabFor="vertical-tab-5">
            {type === "Patient"
              ? "Search Doctors"
              : type === "Doctor"
              ? "Account Settings"
              : ""}
          </Tab>
          <Tab tabFor="vertical-tab-6">
            {type === "Patient" ? "Account Settings" : ""}
          </Tab>
        </TabList>
        <TabPanel tabId="vertical-tab-one" component={Profile} />
        <TabPanel tabId="vertical-tab-two" component={UserView} />
        <TabPanel tabId="vertical-tab-three">
          <Jumbotron className={css(Styles.jumbotron)}>
            <h1 color="#FAFAFA">Medicare Gold Plus®</h1>
            <p1>
              Medicare Gold Plus is a Medicare Advantage health maintenance
              organization (HMO) plan that includes all the benefits of Original
              Medicare and may include prescription drug coverage and many
              extras.
            </p1>
            <p1>
              <br />
              <br />
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleShow}
                backgroundColor="#84FFFF"
              >
                Plan Details
              </Button>
              <br />
              <br />
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Benefits</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p1>
                    With an HMO plan, out-of-pocket costs are generally lower,
                    and they may be more predictable than with other types of
                    plans. So you’ll have a better idea of how much you’ll spend
                    on healthcare during the year.
                  </p1>
                  <p1>
                    Medicare Gold Plus HMO plans cover all the benefits of
                    Original Medicare and much more, including:
                  </p1>
                  <p1>
                    <ul />
                    <li>
                      Choice of a primary care physician in the plan network
                    </li>
                    <li>Affordable monthly plan premium</li>
                    <li>
                      Prescription drug coverage equal to or better than the
                      standard requirement for a Medicare Part D plan
                      (prescription drug coverage not available with all plans)
                    </li>
                    <li>Emergency coverage anywhere in the world</li>
                    <li>
                      Coverage for most annual preventive screenings at no cost
                      to you
                    </li>
                    <li>Hospitalization coverage</li>
                  </p1>
                  <hr />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
            </p1>

            <div className={css(Styles.map)}>
              <p1>Our Location:</p1>
              <br />
              <Map lat={40.0287983} lng={-105.2524828} />
            </div>
          </Jumbotron>
        </TabPanel>
        <TabPanel
          tabId="vertical-tab-four"
          component={
            type === "Patient"
              ? MyAppointment
              : type === "Doctor"
              ? MyAppointment
              : pwdchange
          }
        />

        <TabPanel
          tabId="vertical-tab-5"
          component={
            type === "Patient"
              ? SearchDoctors
              : type === "Doctor"
              ? pwdchange
              : SearchDoctors
          }
        />
        <TabPanel
          tabId="vertical-tab-6"
          component={type === "Patient" ? pwdchange : ""}
        />
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
