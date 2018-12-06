import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { Select, Button } from "antd";
import { themeColor } from "../../theme/colors";
import { rerenderProfile } from "../../actions/rerenderActions";
import DoctorProfile from "./DoctorProfile";
const Option = Select.Option;

const days = [];

days.push(<Option key="Monday">Monday</Option>);
days.push(<Option key="Tuesday">Tuesday</Option>);
days.push(<Option key="Wednesday">Wednesday</Option>);
days.push(<Option key="Thursday">Thursday</Option>);
days.push(<Option key="Friday">Friday</Option>);
days.push(<Option key="Saturday">Saturday</Option>);
days.push(<Option key="Sunday">Sunday</Option>);

const time = [];

time.push(<Option key="06:00:00">06:00 - 07:00</Option>);
time.push(<Option key="07:00:00">07:00 - 08:00</Option>);
time.push(<Option key="08:00:00">08:00 - 09:00</Option>);
time.push(<Option key="09:00:00">09:00 - 10:00</Option>);

for (let i = 10; i < 18; i++) {
  time.push(<Option key={`${i}:00:00`}>{`${i}:00 - ${i + 1}:00`}</Option>);
}

const styles = StyleSheet.create({
  instruction: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 28,
    marginRight: 28,
    background: "-webkit-linear-gradient(#833ab4, #fd1d1d,#FF0080)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    //textTransform: "uppercase",
    fontSize: "18px"
  },
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  questions: {
    fontWeight: "bold",
    fontSize: 16
  },
  form: {
    margin: "auto",
    marginTop: "5%",
    width: "70%",
    height: "90%",
    backgroundColor: "#fff",
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    padding: 40,
    // marginTop: "10%",
    // marginLeft: "10%",
    // marginRight: "10%",
    // marginBottom: "10%",
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  "ant-btn-primary": {
    color: "#fff",
    backgroundColor: "#092e6b",
    borderColor: "#092e6b"
  }
});

class WorkTimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSecondStep: false,
      showThirdStep: false,
      workingdays: [],
      workingtime: [],
      errorMsg: "",
      finished: false
    };

    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    this.onClickNext = this.onClickNext.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onChangeDay = value => {
    console.log(`Selected: ${value}`);
    this.setState({ workingdays: value });
  };

  onChangeTime = value => {
    console.log(`Selected: ${value}`);
    this.setState({ workingtime: value });
  };

  onClickNext = () => {
    this.setState({
      showSecondStep: true
    });
  };

  onClickSubmit = () => {
    const { workingdays, workingtime } = this.state;
    const username = this.props.auth.user.username;
    console.log(workingdays);
    console.log(workingtime);
    const appointments = {
      username: username,
      workingdays: workingdays,
      time: workingtime
    };
    axios
      .post("http://127.0.0.1:8000/doctor/appointments", appointments)
      .then(res => {
        if (res.status === 201) {
          console.log(res);
          this.setState({ errorMsg: " You are all set!", finished: true });
          this.props.rerenderProfile(true);
        }
      })
      .catch(() => {
        this.setState({
          errorMsg: " An error occurred, please try again later!"
        });
      });
  };

  componentDidMount = () => {};

  render() {
    const { showSecondStep, finished } = this.state;
    return (
      <div>
        {finished ? (
          <DoctorProfile user={this.props.user} />
        ) : (
          <div className={css(styles.form)}>
            <h1
              style={{
                fontSize: "30px",
                color: "#000"
              }}
            >
              Welcome to Medifast!
            </h1>
            <div className={css(styles.instruction)}>
              Please add your work time so that patients
              may book appointments with you.
            </div>
            <div className="select">
              <div className={css(styles.questions)}>
                Please select your working days.
              </div>
              <Select
                mode="multiple"
                size="large"
                placeholder="Please select"
                onChange={this.onChangeDay}
                style={{ width: "100%", marginTop: 24 }}
              >
                {days}
              </Select>
              <br />
              <Button
                type="primary"
                block
                onClick={this.onClickNext}
                style={{ marginTop: 24, marginBottom: 24 }}
                className={css(styles["ant-btn-primary"])}
              >
                Next
              </Button>
              <br />
              {showSecondStep ? (
                <div>
                  <div className={css(styles.questions)}>
                    Please select your work times.
                  </div>
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Please select"
                    onChange={this.onChangeTime}
                    style={{ width: "100%", marginTop: 24 }}
                  >
                    {time}
                  </Select>
                  <br />
                  <Button
                    type="primary"
                    block
                    onClick={this.onClickSubmit}
                    style={{ marginTop: 24, marginBottom: 24 }}
                    className={css(styles["ant-btn-primary"])}
                  >
                    Submit
                  </Button>
                </div>
              ) : (
                <div />
              )}
              <br />
              <div className={css(styles.error)}>{this.state.errorMsg}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { rerenderProfile }
)(WorkTimeForm);
