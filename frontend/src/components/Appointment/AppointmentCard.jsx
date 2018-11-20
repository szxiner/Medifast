import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "antd";
import { Grid, Row, Col } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { List } from "react-content-loader";

import DoctorModal from "../UserList/DoctorModal";
import PatientModal from "../UserList/PatientModal";
import calendar from "../../images/calendar.svg";

const weekdays = [
  "null",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const styles = StyleSheet.create({
  container: {
    width: "92%",
    backgroundImage: "linear-gradient(right, white 80%, #E9EBEC 20%)",
    borderRadius: 8,
    border: "1px solid",
    borderColor: "#E9EBEC",
    margin: "2%",
    padding: "2%"
  },
  containerSmall: {
    width: "100%",
    height: "60%",
    borderRadius: 8,
    border: "1px solid",
    borderColor: "#E9EBEC",
    padding: "2%"
  },
  name: {
    fontSize: 28,
    paddingRight: 12,
    paddingBottom: 4,
    borderBottom: "1px solid",
    borderColor: "#1890ff"
  },
  nameSmall: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 4,
    borderBottom: "1px solid",
    borderColor: "#1890ff"
  },
  modal: {
    position: "absolute",
    textAlign: "right",
    right: 0,
    bottom: 0,
    padding: 4
  },
  info: {
    marginLeft: 24,
    paddingTop: 4,
    fontSize: 18,
    lineHeight: "2em"
  },
  infoSmall: {
    marginLeft: 12,
    paddingTop: 4,
    fontSize: 16,
    lineHeight: "2em"
  }
});

class AppointmentCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctor: undefined,
      patient: undefined,
      modal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentDidMount = () => {
    const { appointment } = this.props;
    const { auth } = this.props;
    const { type } = auth.user;
    if (type === "Patient") {
      axios.get("http://127.0.0.1:8000/doctor/profile").then(res => {
        this.setState({
          doctor: _.find(res.data, { username: appointment.docusername })
        });
      });
    } else {
      axios.get("http://127.0.0.1:8000/patient/profile").then(res => {
        this.setState({
          patient: _.find(res.data, { username: appointment.patientusername })
        });
      });
    }
  };

  render() {
    const { appointment } = this.props;
    const { doctor, patient } = this.state;
    const { auth, size } = this.props;
    const { type } = auth.user;
    return (
      <div
        className={!size ? css(styles.container) : css(styles.containerSmall)}
      >
        <Grid style={{ width: "100%" }}>
          <Row>
            <Col xs={!size ? 3 : 0} md={!size ? 2 : 0}>
              {!size ? (
                <div style={{ marginTop: "6%" }}>
                  <img src={calendar} width="100%" />
                </div>
              ) : (
                <div />
              )}
            </Col>

            <Col xs={!size ? 15 : 18} md={!size ? 10 : 12}>
              {!doctor && !patient ? (
                <div style={{ marginLeft: 24 }}>
                  <List height={80} />
                </div>
              ) : (
                <div>
                  {!!doctor ? (
                    <div
                      className={
                        !size ? css(styles.info) : css(styles.infoSmall)
                      }
                    >
                      <div
                        className={
                          !size ? css(styles.name) : css(styles.nameSmall)
                        }
                      >
                        Doctor {doctor.First_name} {doctor.Last_Name}
                      </div>
                      <div>
                        <div
                          className={
                            !size ? css(styles.info) : css(styles.infoSmall)
                          }
                        >
                          Hospital: {doctor.Hospital}{" "}
                          <div>
                            Date:{" "}
                            {
                              weekdays[
                                moment
                                  .utc(appointment.bdate, "YYYY-MM-DD")
                                  .weekday()
                              ]
                            }{" "}
                            •{" "}
                            {moment
                              .utc(appointment.bdate, "YYYY-MM-DD")
                              .format("MM-DD-YYYY")}{" "}
                          </div>
                          <div>
                            Time:{" "}
                            {moment
                              .utc(
                                appointment.btime[0].substring(0, 5),
                                "HH:mm"
                              )
                              .format("hh:mm a")}{" "}
                            -{" "}
                            {moment
                              .utc(
                                appointment.btime[0].substring(0, 5),
                                "HH:mm"
                              )
                              .add(1, "hour")
                              .format("hh:mm a")}
                          </div>
                          <div className={css(styles.modal)}>
                            <a onClick={() => this.handleOpenModal()}>
                              {!size ? (
                                <Button type="primary" icon="car" size="large">
                                  Get Direction
                                </Button>
                              ) : (
                                <Button
                                  type="primary"
                                  icon="car"
                                  shape="circle"
                                />
                              )}
                            </a>
                          </div>
                        </div>
                      </div>
                      <DoctorModal
                        showModal={this.state.showModal}
                        handleCloseModal={this.handleCloseModal}
                        activeInfo={[doctor]}
                        showAppt={false}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {!!patient ? (
                    <div className={css(styles.info)}>
                      <div>
                        Name: {patient.First_name} {patient.Last_Name}
                      </div>
                      <div>
                        Time:
                        {moment
                          .utc(appointment.bdate, "YYYY-MM-DD")
                          .format("MM-DD-YYYY")}{" "}
                        •{" "}
                        {moment
                          .utc(appointment.btime[0].substring(0, 5), "HH:mm")
                          .format("hh:mm a")}
                        -
                        {moment
                          .utc(appointment.btime[0].substring(0, 5), "HH:mm")
                          .add(1, "hour")
                          .format("hh:mm a")}
                      </div>
                      <div className={css(styles.modal)}>
                        <a onClick={() => this.handleOpenModal()}>
                          {!size ? (
                            <Button type="primary" icon="car" size="large">
                              View Medical History
                            </Button>
                          ) : (
                            <Button type="primary" icon="plus" shape="circle" />
                          )}
                        </a>
                      </div>
                      <PatientModal
                        showModal={this.state.showModal}
                        handleCloseModal={this.handleCloseModal}
                        activeProfile={patient.Last_Name}
                        activeInfo={[patient]}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

AppointmentCard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(AppointmentCard);
