import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

import { authenticateUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import Button from "../../common/Button";
import { FormGroup, FormControl } from "react-bootstrap";

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
    borderRadius: 8
  },
  logo: {
    textAlign: "center"
  }
});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.authenticateUser(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css(styles.box)}>
        <h1 className={css(styles.logo)}>Medifast</h1>
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
            <br />
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
            <br />
            <Button name="Log in" type="submit" />
          </FormGroup>
        </form>
      </div>
    );
  }
}

Login.propTypes = { authenticateUser: PropTypes.func.isRequired };

export default connect(
  null,
  { authenticateUser }
)(Login);
