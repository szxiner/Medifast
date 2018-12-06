import "rc-calendar/assets/index.css";

import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import Calendar from "rc-calendar";
import { connect } from "react-redux";
import { Button, Icon, Radio } from "antd";
import { Grid, Row, Col } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  expanded: {
    ":before": {},
    ":after": {},
    height: "auto",
    padding: 8
  },
  expandedconfirm: {
    ":before": {},
    ":after": {},
    height: "auto",
    padding: 8
  },
  notExpanded: {
    overflow: "hidden",
    height: 0
    //transition: "height 2s ease-out",
    // maxHeight: 300
  },
  message: {
    textAlign: "center",
    margin: 10,
    fontWeight: 500,
    color: themeColor.red1,
    fontFamily: "Crimson Text, serif",
    fontSize: 32
  },
  "ant-btn": {
    backgroundColor: "transparent",
    borderColor: "#008000",
    color: "#008000"
  }
});

const RadioGroup = Radio.Group;

const now = moment();

function disabledDate(current) {
  if (!current) {
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf();
}

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      value: props.defaultValue,
      time: null,
      expandConfirm: false,
      available: [],
      message: "",
      submitted: false,
      beforeconfirm: true,
      afterconfirm: false,
      date: "",
      apttime: ""
    };
  }

  onChange = value => {
    this.setState({
      value
    });
    const { username } = this.props;
    if (value) {
      if (value) {
        axios
          .get(
            `http://localhost:8000/doctor/appointments?date=${value.format(
              "YY-MM-DD"
            )}&username=${username}`
          )
          .then(res => {
            if (Array.isArray(res.data)) {
              this.setState({ available: res.data });
            } else {
              this.setState({ available: [] });
            }
            console.log(res.data, "here i ammmmm the dataaaaa");
          });
      }
    }
  };

  radioOnChange = e => {
    this.setState({
      time: e.target.value,
      disabled: false
    });
  };

  onClick = () => {
    this.setState({
      expandConfirm: true
    });
  };

  onSubmit = () => {
    this.setState({ submitted: true });
    const { username } = this.props.auth.user;
    this.state.date = this.state.value.format("YYYY-MM-DD");
    this.state.apttime = [this.state.available[this.state.time]];
    const request = {
      docusername: this.props.username,
      patientusername: username,
      bdate: this.state.value.format("YYYY-MM-DD"),
      btime: [this.state.available[this.state.time]],
      issue: "fever"
    };

    axios.post(`http://localhost:8000/doctor/bookings`, request).then(res => {
      if (res.status === 201) {
        // this.setState({
        //   message: `Your Appointment with Dr.${
        //     this.props.docname
        //   } A confirmation email has been sent to you.`
        // });
        this.setState({ beforeconfirm: false });
        this.setState({ afterconfirm: true });
      } else {
        this.setState({
          message: "An error occurs, please try again later."
        });
      }
      console.log("afterconfirm variable in loo[", this.state.afterconfirm);
    });

    console.log("afterconfirm variable after loop", this.state.afterconfirm);
  };

  render() {
    const { value, time, available } = this.state;
    const { docname } = this.props;
    console.log("afterconfirm variable in main", this.state.afterconfirm);

    return (
      <div>
        <Grid style={{ width: "100%" }}>
          <div
            className={
              this.state.beforeconfirm
                ? css(styles.expandedconfirm)
                : css(styles.notExpanded)
            }
          >
            <Row className="show-grid">
              <Col xs={9} md={6}>
                <Icon type="calendar" theme="outlined" /> Confirm Date
                <hr />
                <div style={{ marginBottom: 10 }}>
                  <Calendar
                    disabledDate={disabledDate}
                    defaultValue={now}
                    onChange={this.onChange}
                    showDateInput={false}
                    showWeekNumber={false}
                    showToday={false}
                    showOk={false}
                  />
                </div>
              </Col>
              <Col xs={9} md={6}>
                <Icon type="schedule" theme="outlined" /> Confirm Time
                <hr />
                <div>
                  {available.length > 0 ? (
                    <RadioGroup onChange={this.radioOnChange} value={time}>
                      {_.map(available, (timeSlot, key) => {
                        return (
                          <Radio
                            style={{
                              display: "block",
                              height: "30px",
                              lineHeight: "30px"
                            }}
                            value={key}
                          >
                            {moment
                              .utc(timeSlot.substring(0, 5), "HH:mm")
                              .format("hh:mm a")}{" "}
                            -{" "}
                            {moment
                              .utc(timeSlot.substring(0, 5), "HH:mm")
                              .add(1, "hour")
                              .format("hh:mm a")}
                          </Radio>
                        );
                      })}
                    </RadioGroup>
                  ) : (
                    <p>No available time found. Please try another date</p>
                  )}
                </div>
                <br />
                <Button
                  type="normal"
                  disabled={!(!!value && time !== null)}
                  style={{ width: 100 }}
                  onClick={this.onClick}
                >
                  Select
                </Button>
              </Col>
            </Row>
          </div>
          <div
            className={
              this.state.beforeconfirm
                ? css(styles.expandedconfirm)
                : css(styles.notExpanded)
            }
          >
            <Row className="show-grid">
              <div
                className={
                  this.state.expandConfirm
                    ? css(styles.expanded)
                    : css(styles.notExpanded)
                }
              >
                <Icon type="solution" theme="outlined" />
                &nbsp; Confirm appointment
                <hr />
                Date: &nbsp;
                {!!value ? value.format("MM-DD-YYYY") : "ERROR"}
                <br />
                Time: &nbsp;
                {available[time] &&
                  moment
                    .utc(available[time].substring(0, 5), "HH:mm")
                    .format("hh:mm a")}{" "}
                -{" "}
                {available[time] &&
                  moment
                    .utc(available[time].substring(0, 5), "HH:mm")
                    .add(1, "hour")
                    .format("hh:mm a")}
                <br />
                <Button
                  type="primary"
                  disabled={this.state.disabled}
                  style={{ width: "100%", marginTop: 16, height: 36 }}
                  htmlType="submit"
                  onClick={this.onSubmit}
                >
                  Confirm
                </Button>
                {this.state.submitted && this.state.message === "" ? (
                  <Icon
                    type="loading"
                    theme="outlined"
                    style={{ marginLeft: "50%" }}
                  />
                ) : (
                  <div />
                )}
              </div>
            </Row>
          </div>
          <Row />
        </Grid>
        <div
          className={
            this.state.afterconfirm
              ? css(styles.expanded)
              : css(styles.notExpanded)
          }
        >
          <p
            style={{
              fontFamily: "font-family: 'Muli', sans-serif",
              fontSize: 20,
              textAlign: "center",
              display: "inline-block"
            }}
          >
            Your Appointment with Dr.{this.props.docname} has been booked. A
            confirmation email has been sent to you.
          </p>
          <p style={{ fontSize: 30, textAlign: "center" }}>
            <Icon
              type="check-circle"
              className={css(styles["ant-btn"])}
              style={{ fontSize: 30, width: "85%", textAlign: "center" }}
            />
          </p>

          <br />
          <p
            style={{
              fontFamily: "font-family: 'Muli', sans-serif",
              fontSize: 18,
              textAlign: "center"
            }}
          >
            Appointment Day: {this.state.date}
          </p>

          <p
            style={{
              fontFamily: "font-family: 'Muli', sans-serif",
              fontSize: 18,
              textAlign: "center"
            }}
          >
            Appointment Time:
            {moment.utc(this.state.apttime, "HH:mm:ss").format("hh:mm a")}
          </p>
          <br />
          <p
            style={{
              fontFamily: "font-family: 'Muli', sans-serif",
              fontSize: 16,
              textAlign: "center",
              color: "red"
            }}
          >
            Please be 30 minutes prior to the appointment.
          </p>
          {/* </p> */}
        </div>
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
)(MyCalendar);
