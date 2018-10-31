import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { StyleSheet, css } from "aphrodite";
import heart from "../../images/heart.svg";

const styles = StyleSheet.create({
  patientInfo: {
    padding: 12,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: "3em",
    marginBottom: "3%",
    paddingRight: 28,
    borderRight: "1px solid",
    borderColor: "#E9EBEC"
  },
  insuranceContainer: {
    marginTop: "8%",
    marginBottom: "14%"
  }
});

export default class InsuranceProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <div className={css(styles.insuranceContainer)}>
        <Grid style={{ width: "100%" }}>
          <Row>
            <Col xs={12} md={8}>
              <div className={css(styles.patientInfo)}>
                <h1>Welcome, Insurance Officer</h1>
                In Medifast, you can view all available patients and doctors.
                However, you will not be able to see user's confidential
                information or book appointments with a doctor.
              </div>
            </Col>
            <Col xs={6} md={4}>
              <br />
              <img src={heart} width="80%" />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
