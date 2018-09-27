import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";

import { createUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    width: "50%",
    height: "50%",
    padding: 12,
    borderColor: themeColor.grey3
  },
  inputBox: {},
  // TODO: Change button style
  loginButton: { width: 80 }
});
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      typeOfUser: "patient"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      typeOfUser: "patient"
    };

    this.props.createUser(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css(styles.box)}>
        <h1>Medifast</h1>
        <br />

        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <label>Username:</label>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="username"
              label="Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <label>Password:</label>
            <FormControl
              className={css(styles.inputBox)}
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <Button
              className={css(styles.loginButton)}
              bsStyle="primary"
              type="submit"
            >
              Sign up
            </Button>
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
