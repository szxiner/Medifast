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
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  inputBox: {},
  // TODO: Change button style
  loginButton: { width: 80 },
  logo: {
    textAlign: "center"
  }
});
export class ForgotPwd extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      errorMsg: "",
      securityQuestion: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://127.0.0.1:8000?username=this.state.username")
      .then(response => response.json())
      .then(securityQuestion => this.setState({ securityQuestion }));
  }
  onSubmit = e => {
    e.preventDefault();
    if (this.state.username === "") {
      this.setState({ errorMsg: "Please enter username." });
    } else {
    }
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
            <Button name="Submit" type="submit" />
          </FormGroup>
        </form>
        <div className={css(styles.error)}>{this.state.errorMsg}</div>
      </div>
    );
  }
}
