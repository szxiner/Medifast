import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { createUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
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
  inputBox: {},
  // TODO: Change button style
  loginButton: { width: 80 },
  logo: {
    textAlign: "center"
  }
});
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      typeOfUser: "role"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      typeOfUser: this.state.typeOfUser
    };

    this.props.createUser(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css(styles.box)}>
        <h1 className={css(styles.logo)}>Medifast</h1>
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
            <ControlLabel>Role:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="typeOfUser"
            >
              <option value="role">Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="insurance">Insurance Provider</option>
            </FormControl>
            <br />
            <br />
            <Button name="Log in" type="submit" />
          </FormGroup>
        </form>
      </div>
    );
  }
}

Register.propTypes = { createUser: PropTypes.func.isRequired };

export default connect(
  null,
  { createUser }
)(Register);
