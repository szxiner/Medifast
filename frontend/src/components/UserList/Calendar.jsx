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
    height: 200,
    padding: 8
  },
  notExpanded: {
    overflow: "hidden",
    height: 0,
    transition: "height 2s ease-out",
    maxHeight: 300
  },
  message: {
    textAlign: "center",
    margin: 10,
    fontWeight: 500,
    color: themeColor.red1
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
      submitted: false
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
    const request = {
      docusername: this.props.username,
      patientusername: username,
      bdate: this.state.value.format("YYYY-MM-DD"),
      btime: [this.state.available[this.state.time]]
    };

    axios.post(`http://localhost:8000/doctor/bookings`, request).then(res => {
      if (res.status === 201) {
        this.setState({
          message: "Appointment Booked! A confirmation email will be sent."
        });
      } else {
        this.setState({
          message: "An error occurs, please try again later."
        });
      }
    });
  };

  render() {
    const { value, time, available } = this.state;

    return (
      <Grid style={{ width: "100%" }}>
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
                        {timeSlot.substring(0, 5)} -
                        {moment
                          .utc(timeSlot.substring(0, 5), "HH:mm")
                          .add(1, "hour")
                          .format("HH:mm")}
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
            {available[time] && available[time].substring(0, 5)}-
            {available[time] &&
              moment
                .utc(available[time].substring(0, 5), "HH:mm")
                .add(1, "hour")
                .format("HH:mm")}
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
            <div className={css(styles.message)}>{this.state.message}</div>
          </div>
        </Row>
      </Grid>
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
