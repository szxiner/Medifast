import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";

import { Icon } from "antd";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import AppointmentCard from "./AppointmentCard";

const styles = StyleSheet.create({
  container: {
    width: "90%"
  },
  error: {
    width: "85%",
    backgroundColor: themeColor.white,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 120,
    paddingBottom: 120,
    fontSize: 28,
    margin: "5%"
  }
});

class billing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myAppts: []
    };
  }


  render() {
    const { auth } = this.props;
    const { myAppts } = this.state;
    return (
     
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(MyAppointment);
