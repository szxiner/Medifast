import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { List } from "react-content-loader";

import { StyleSheet, css } from "aphrodite";
import doctor from "../../images/doctor.svg";
import AppointmentCard from "../Appointment/AppointmentCard";

const styles = StyleSheet.create({
  patientInfo: {
    padding: 12,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: "3em",
    marginBottom: "3%"
  },
  appt: {
    marginTop: "3%",
    paddingLeft: 24,
    fontSize: 20,
    fontWeight: "bold"
  },
  healthy: {
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "10%"
  }
});

class DoctorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextAppointment: undefined,
      loading: true
    };
  }

  componentDidMount = () => {
    const { auth } = this.props;
    const { username } = auth.user;
    axios.get("http://localhost:8000/doctor/bookings").then(res => {
      const list = _.filter(res.data, { docusername: username });
      if (list.length !== 0) {
        const sort = _.sortBy(list, o => {
          return new moment(o.bdate);
        });
        this.setState({
          nextAppointment: sort[0],
          loading: false
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { user } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Grid style={{ width: "100%" }}>
          <Row>
            <Col xs={12} md={8}>
              <h1>Welcome Back {user.First_name}</h1>
              <div className={css(styles.patientInfo)}>
                <div>
                  Doctor: {user.First_name} {user.Last_Name}
                </div>
                <div>Specialization: {user.specialization}</div>
                <div>Hospital/Clinic: {user.Hospital}</div>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <img src={doctor} width="80%" />
            </Col>
          </Row>
          <Row>
            {loading ? (
              <List />
            ) : (
              <div>
                {!!this.state.nextAppointment ? (
                  <div>
                    <hr />
                    <div className={css(styles.appt)}>
                      Your Upcoming Appointment:
                    </div>
                    <AppointmentCard appointment={this.state.nextAppointment} />
                  </div>
                ) : (
                  <div className={css(styles.healthy)}>
                    <hr />
                  </div>
                )}
              </div>
            )}
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
