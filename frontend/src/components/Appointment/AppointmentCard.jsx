import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "antd";
import { Grid, Row, Col } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import DoctorModal from "../UserList/DoctorModal";
import PatientModal from "../UserList/PatientModal";

const styles = StyleSheet.create({
  container: {
    width: "88%",
    backgroundImage: "linear-gradient(right, white 75%, #E9EBEC 25%)",
    borderRadius: 8,
    margin: "2%",
    padding: "5%"
  },
  info: {},
  modal: {
    right: 0,
    top: 0
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
    const { auth } = this.props;
    const { type } = auth.user;
    return (
      <div className={css(styles.container)}>
        <Grid style={{ width: "100%" }}>
          <Row>
            <Col xs={4} md={3}>
              <Icon type="schedule" theme="outlined" style={{ fontSize: 80 }} />
            </Col>
            <Col xs={14} md={9}>
              {!!doctor ? (
                <div className={css(styles.info)}>
                  <div>
                    <div> Doctor {doctor.Last_Name}</div>
                    <div> Hospital: {doctor.Hospital} </div>
                  </div>
                  <div>
                    Time:
                    {moment
                      .utc(appointment.bdate, "YYYY-MM-DD")
                      .format("MM-DD-YYYY")}{" "}
                    •{" "}
                    {moment
                      .utc(appointment.btime[0].substring(0, 5), "HH:mm")
                      .format("HH:mm")}
                    -
                    {moment
                      .utc(appointment.btime[0].substring(0, 5), "HH:mm")
                      .add(1, "hour")
                      .format("HH:mm")}
                  </div>
                  <div className={css(styles.modal)}>
                    <a onClick={() => this.handleOpenModal()}>• More •</a>
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
                      .format("HH:mm")}
                    -
                    {moment
                      .utc(appointment.btime[0].substring(0, 5), "HH:mm")
                      .add(1, "hour")
                      .format("HH:mm")}
                  </div>
                  <div className={css(styles.modal)}>
                    <a onClick={() => this.handleOpenModal()}>• More •</a>
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
