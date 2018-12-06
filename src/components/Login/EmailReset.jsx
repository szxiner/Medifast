import React from "react";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";

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
    },
    logo: {
      textAlign: "center",
      color: "#000"
    }
  },

  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: SecondaryThemeColor.red1
  },
  wellStyles: { maxWidth: 400, margin: "0 auto 10px" },
  expanded: {
    height: 150
  },
  unexpanded: {
    height: 0,
    overflow: "hidden"
  },
  a: {
    fontWeight: 600,
    textDecorationLine: "underline",
    text: "Bold",
    fontSize: 22
  },
  resetmessage: {
    fontSize: 22
  }
});

export default class EmailReset extends React.Component {
  constructor() {
    super();
    this.state = {
      isexpanded: true,

      username_entered: "",
      isSuccess: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
  }
  onSubmit1 = e => {
    e.preventDefault();
    const user = this.state.username;
    console.log(this.state.username);

    if (this.state.username === "") {
      this.setState({ errorMsg_onSumbit1: "Please enter your username." });
    }

    // this.props.authenticateUser(user);
    else {
      this.state.username_entered = true;
      axios
        .post(
          `http://127.0.0.1:8000/users-api/forgot_password?username=${
            this.state.username
          }`
        )
        .then(res => {
          console.log(res.status);

          if (res.status === 200) {
            this.setState({ isSuccess: true });
            this.setState({ isexpanded: false });
          } else {
            this.setState({ errorMsg: "ERROR" });
          }
          console.log(this.state.securityQ);
        });
    }
  };

  onSubmit2 = e => {
    // this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    console.log("hahaha", this.state.username);

    if (this.state.securityAns === "") {
      this.setState({ errorMsg_onVerify: "Please complete all the fields." });
    } else {
      axios
        .get(`http://127.0.0.1:8000/users-api/${this.state.username}`)
        .then(res => {
          console.log(res.status);
          console.log(res.data.securityAns);
          if (res.status === 200) {
            if (this.state.securityAns === res.data.securityAns)
              this.setState({ verify: true });
            else {
              this.setState({ errorMsg_onVerify2: "Incorrect Answer" });
              this.setState({ errorMsg_onVerify: "" });
            }
          } else {
            this.setState({ errorMsg_onVerify2: "ERROR with connection" });
          }
          console.log(this.state.securityAns);
        });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css(styles.box)}>
        <h1 className={css(styles.logo)}>Medifast</h1>

        <div
          className={
            this.state.isexpanded
              ? css(styles.expanded)
              : css(styles.unexpanded)
          }
        >
          <h4 className={css(styles.logo)}>Password Reset</h4>
          <form onSubmit={this.onSubmit1}>
            <FormGroup>
              <label>Username:</label>
              <FormControl
                className={css(styles.inputBox)}
                type="text"
                name="username"
                label="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </FormGroup>
            <Button name="Send a new password through email" type="submit" />
            <br />
            <div className={css(styles.error)}>
              {this.state.errorMsg_onSumbit1}
            </div>
          </form>
        </div>
        {this.state.username_entered ? (
          <div className={css(styles.box)}>
            <div className={css(styles.resetmessage)}>
              <Alert bsStyle="warning">
                <strong>
                  A new password has been sent to the registered email address.
                  Please login{" "}
                  <a href="/login" className={css(styles.a)}>
                    {" "}
                    here{" "}
                  </a>{" "}
                  with your new password.
                </strong>
              </Alert>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
