import "rc-calendar/assets/index.css";
import "moment/locale/en-gb";

import React from "react";
import _ from "lodash";
import moment from "moment";
import Calendar from "rc-calendar";

import { Button, Icon, Radio } from "antd";
import { Grid, Row, Col } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";

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
  }
});

const RadioGroup = Radio.Group;

const dummyTimes = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "14:00-15:00",
  "15:00-16:00"
];

const now = moment();
now.locale("en-gb").utcOffset(0);

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

export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      value: props.defaultValue,
      time: null,
      expandConfirm: false
    };
  }

  onChange = value => {
    this.setState({
      value
    });
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

  render() {
    const { value, time } = this.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
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
              <RadioGroup onChange={this.radioOnChange} value={time}>
                {_.map(dummyTimes, (timeSlot, key) => {
                  return (
                    <Radio style={radioStyle} value={key}>
                      {timeSlot}
                    </Radio>
                  );
                })}
              </RadioGroup>
            </div>
            <br />
            <Button
              type="normal"
              disabled={!(!!value && !!time)}
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
            Name: &nbsp; {"Xiner"} <br />
            Date: &nbsp;
            {!!value ? value.format("MM/DD/YYYY") : "ERROR"}
            <br />
            Time: &nbsp;
            {dummyTimes[time]} <br />
            <Button
              type="primary"
              disabled={this.state.disabled}
              style={{ width: "100%", marginTop: 16, height: 36 }}
              htmlType="submit"
            >
              Confirm
            </Button>
          </div>
        </Row>
      </Grid>
    );
  }
}
