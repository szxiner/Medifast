import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { themeColor } from "../../theme/colors";
import Button from "../../common/Button";
import { rerenderProfile } from "../../actions/rerenderActions";
import PatientProfile from "./PatientProfile";
const styles = StyleSheet.create({
  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  welcome: {
    fontSize: 20,
    fontWeight: 500,
    marginLeft: 40
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
      errorMsg: "",
      patient: undefined,
      finished: false,
      insurance: "",
      income: ""
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
      DOB: moment.utc(this.state.dob, "MM-DD-YYYY").format("YYYY-MM-DD"),
      income: this.state.income,
      company: this.state.insurance
    };
    this.setState({ patient: patient });
    axios
      .post("http://127.0.0.1:8000/patient/profile", patient)
      .then(res => {
        if (res.status === 201) {
          this.setState({ errorMsg: "Profile updated!", finished: true });
          this.props.rerenderProfile(true);
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
        {this.state.finished ? (
          <PatientProfile user={this.state.patient} />
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
            <br />
            <div className={css(styles.welcome)}>
              To get full service of our digital platform, please tell us a bit
              more about yourself!
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
                <ControlLabel>Annual Income:</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={this.onChange}
                  name="income"
                >
                  <option value="income">Select Annual Income</option>
                  <option value="60000">Upto 60000</option>
                  <option value="80000">Upto 80000</option>
                  <option value="100000">Upto 100000</option>
                  <option value="100000">Above 100000</option>
                </FormControl>
                <br />
                <ControlLabel>Select Insurance Provider:</ControlLabel>

                <FormControl
                  componentClass="select"
                  onChange={this.onChange}
                  name="insurance"
                >
                  <option value="insurance">Select Insurance Provider</option>
                  <option value="Medicare">Medicare</option>
                  <option value="Humana">Humana</option>
                </FormControl>
                <br />
                <br />
                <Button name="Submit" type="submit" />
              </FormGroup>
            </form>
            <div className={css(styles.error1)}>{this.state.errorMsg}</div>
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
)(PatientProfileForm);
