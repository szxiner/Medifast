import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { storeUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";

import Button from "../../common/Button";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  logo: {
    textAlign: "center"
  },
  clickMe: {
    textAlign: "center"
  },
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  box1: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: SecondaryThemeColor.white,
    color: SecondaryThemeColor.aegean2,
    borderColor: SecondaryThemeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  logo1: {
    textAlign: "center"
  },
  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: SecondaryThemeColor.red1
  }
});

export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      typeOfUser: "role",
      SecurityQuestion1: "",
      SecurityQuestion2: "",
      email: "default@yahoo.com",
      phone_number: 9492288063,
      errorMsg: "",
      primaryColor: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === "" ||
      this.state.typeOfUser === "role" ||
      this.state.securityQ === ""
    ) {
      this.setState({ errorMsg: "Please complete all the fields." });
    } else {
      if (this.state.password === this.state.confirmPassword) {
        const user = {
          username: this.state.username,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          typeOfUser: this.state.typeOfUser,
          email: this.state.email,
          phone_number: this.state.phone_number,
          securityQ: this.state.SecurityQuestion,
          securityAns: this.state.securityAns
        };

        axios.post("http://127.0.0.1:8000/users-api/", user).then(res => {
          if (res.status === 201) {
            this.props.storeUser(user);
            this.props.history.push("/2fa");
          } else {
            this.setState({ errorMsg: "User Name already exists." });
          }
        });
      } else {
        this.setState({ errorMsg: "Passwords does not match." });
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.setState({ primaryColor: !this.state.primaryColor });
  };

  render() {
    const { primaryColor } = this.state;

    return (
      <div className={css(primaryColor ? styles.box : styles.box1)}>
        <h1 className={css(primaryColor ? styles.logo : styles.logo1)}>
          Medifast
        </h1>
        <br />
        {/*TODO: Create global form*/}
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <ControlLabel>Username:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Password:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Confirm Password:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
            <br />
            <ControlLabel>Role:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="typeOfUser"
            >
              <option value="role">Role</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Insurance">Insurance Provider</option>
            </FormControl>
            <br />
            <ControlLabel>Security Question</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="securityQ"
            >
              <option value="Select a role">Select</option>
              <option value="Q1">What's the name of your first teacher?</option>
              <option value="Q2">What is your dream job?</option>
              <option value="Q3">What is your favourite color?</option>
            </FormControl>
            <br />
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="Security Question Answer"
              label="Username"
              placeholder="Enter your answer here."
              value={this.state.securityAns}
              onChange={this.onChange}
            />
            <br />
            <Button
              name="Sign Up"
              type="submit"
              color={primaryColor ? "primary" : "secondary"}
            />
          </FormGroup>
        </form>
        <div className={css(primaryColor ? styles.error : styles.error1)}>
          {this.state.errorMsg}
        </div>{" "}
        <a onClick={this.onClick} className={css(styles.clickMe)}>
          Click Me!
        </a>
      </div>
    );
  }
}

Register.propTypes = { storeUser: PropTypes.func.isRequired };

export default connect(
  null,
  { storeUser }
)(Register);
