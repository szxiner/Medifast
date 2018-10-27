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
import { ResetPassword } from "./ResetPassword";

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
    },
    logo: {
      textAlign: "center"
    }
  },
  logo1: {
    textAlign: "center"
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
  }
});

export default class EmailReset extends React.Component {
  constructor() {
    super();
    this.state = {
      isexpanded: true,
      username: "",
      username_entered: ""
    };
  }
  onSubmit1 = e => {
    e.preventDefault();
    console.log(this.state.username);

    if (this.state.username === "") {
      this.setState({ errorMsg_onSumbit1: "Please enter user name." });
    }

    // this.props.authenticateUser(user);
    else {
      this.username_entered = true;
      axios
        .get(`http://127.0.0.1:8000/users-api/${this.state.username}`)
        .then(res => {
          console.log(res.status);
          console.log(res.data.securityQ);
          if (res.status === 200) {
            console.log(res.data.securityQ);
            this.setState({ securityQ: res.data.securityQ });
            this.setState({ username_entered: true });
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

  render() {
    return (
      <div className={css(styles.box)}>
        <h1 className={css(styles.logo)}>Medifast</h1>
        <h4 className={css(styles.logo)}>Password Reset</h4>

        <div
          className={
            this.state.isexpanded
              ? css(styles.expanded)
              : css(styles.unexpanded)
          }
        >
          <form onSubmit={this.onSubmit1}>
            <FormGroup>
              <label>Username:</label>
              <FormControl
                className={css(styles.inputBox)}
                type="text"
                name="username"
                label="Username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </FormGroup>
            <Button name="Send new password in e-mail" type="submit" />
            <br />
            <div className={css(styles.error)}>
              {this.state.errorMsg_onSumbit1}
            </div>
          </form>
        </div>
        {this.username_entered ? (
          <form onSubmit={this.onSubmit2}>
            <FormGroup>
              <br />
              <ControlLabel>
                Enter new password sent throught mail here:
              </ControlLabel>
              <FormControl
                className={css(styles.inputBox)}
                type="text"
                name="securityAns"
                label="Security Answer"
                placeholder="Enter your answer here"
                value={this.state.securityAns}
                onChange={this.onChange}
              />
              <br />
              <Button name="verify" type="submit" />
              <div className={css(styles.error)}>
                {this.state.errorMsg_onVerify}
              </div>
              <div className={css(styles.error)}>
                {" "}
                {this.state.errorMsg_onVerify2}
              </div>
            </FormGroup>
          </form>
        ) : (
          <p> </p>
        )}
      </div>
    );
  }
}
