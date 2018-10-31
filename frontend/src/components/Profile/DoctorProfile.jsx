import React from "react";
import _ from "lodash";
import axios from "axios";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";

import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  error1: {}
});

class DoctorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Welcome Back {user.First_name}</h1>
        <Grid style={{ width: "100%" }}>
          <Row>
            <Col xs={12} md={8}>
              <h1>Welcome Back {user.First_name}</h1>
              <div>
                Name: {user.First_name} {user.Last_Name}
              </div>
              <div>Date of Birth: {user.DOB}</div>
              <div>Your Upcoming Appointment:</div>
            </Col>
            <Col xs={6} md={4}>
              <svg src="../../svg/medical.svg" />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(DoctorProfile);
