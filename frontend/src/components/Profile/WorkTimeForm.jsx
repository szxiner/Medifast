import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { Select, Icon } from "antd";
import { themeColor } from "../../theme/colors";
import Button from "../../common/Button";

const Option = Select.Option;

const days = [];

days.push(<Option key="mon">Monday</Option>);
days.push(<Option key="tue">Tuesday</Option>);
days.push(<Option key="wed">Wednesday</Option>);
days.push(<Option key="thur">Thursday</Option>);
days.push(<Option key="fri">Friday</Option>);
days.push(<Option key="sat">Saturday</Option>);
days.push(<Option key="sun">Sunday</Option>);

const time = [];

time.push(<Option key="06:00:00">06:00 - 07:00</Option>);
time.push(<Option key="07:00:00">07:00 - 08:00</Option>);
time.push(<Option key="08:00:00">08:00 - 09:00</Option>);
time.push(<Option key="09:00:00">09:00 - 10:00</Option>);

for (let i = 10; i < 18; i++) {
  time.push(<Option key={`${i}:00:00`}>{`${i}:00 - ${i + 1}:00`}</Option>);
}

const workingdays = [];
const workingtime = [];

const styles = StyleSheet.create({
  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  }
});

class WorkTimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSecondStep: false
    };

    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
  }

  onChangeDay = value => {
    console.log(`Selected: ${value}`);
    workingdays.push(value);
    console.log(workingdays);
  };

  onChangeTime = value => {
    console.log(`Selected: ${value}`);
    workingtime.push(value);
    console.log(workingtime);
  };

  onDaySubmit = () => {
    this.setState({
      showSecondStep: true
    });
  };

  onTimeSubmit = () => {};

  componentDidMount = () => {};

  render() {
    return (
      <div>
        Now, Let's add your work time so future patients can make appointment
        with you on Medifast.
        <div className="select">
          <Select
            mode="multiple"
            size="large"
            placeholder="Please select"
            onChange={this.onChangeDay}
            style={{ width: "100%" }}
          >
            {days}
          </Select>
          <Button name="Next" />
          <br />
          {showSecondStep ? (
            <div>
              <Select
                mode="multiple"
                size="large"
                placeholder="Please select"
                onChange={this.onChangeTime}
                style={{ width: "100%" }}
              >
                {time}
              </Select>
              <Button name="Submit" />
            </div>
          ) : (
            <div />
          )}
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
)(WorkTimeForm);
