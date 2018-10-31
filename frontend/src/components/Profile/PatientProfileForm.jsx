import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { themeColor } from "../../theme/colors";
import Button from "../../common/Button";

const styles = StyleSheet.create({
  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  welcome: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 40
  }
});

class PatientProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      errorMsg: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    const { auth } = this.props;
    const { username } = auth.user;
    e.preventDefault();
    const patient = {
      username: username,
      email: "someEmail@gmail.com",
      First_name: this.state.firstName,
      Last_Name: this.state.lastName,
      gender: this.state.gender,
      DOB: moment.utc(this.state.dob, "MM-DD-YYYY").format("YYYY-MM-DD")
    };
    axios
      .post("http://127.0.0.1:8000/patient/profile", patient)
      .then(res => {
        if (res.status === 201) {
          this.setState({ errorMsg: "Profile updated!" });
          this.props.callBack();
        }
      })
      .catch(() => {
        this.setState({ errorMsg: "An error occurs. Please try again later" });
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <h1>Welcome to Medifast!</h1>
        <div className={css(styles.welcome)}>
          To get full service of our digital platform, please tell us a bit more
          about yourself!
        </div>
        <br />
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <ControlLabel>First Name:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="firstName"
              label="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Last Name:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="lastName"
              label="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Gender:</ControlLabel>
            <FormControl
              componentClass="select"
              onChange={this.onChange}
              name="gender"
            >
              <option value="gender">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="Not with to provide">
                I do not wish to provide
              </option>
            </FormControl>
            <br />
            <ControlLabel>Date of Birth (MM-DD-YYYY):</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="dob"
              label="dob"
              value={this.state.dob}
              onChange={this.onChange}
            />
            <br />
            <br />
            <Button name="Submit" type="submit" />
          </FormGroup>
        </form>
        <div className={css(styles.error1)}>{this.state.errorMsg}</div>
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
)(PatientProfileForm);
