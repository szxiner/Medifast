import React from "react";
import {
  FormGroup,
  FormControl,
  NavItem,
  ControlLabel,
  Label,
  Modal,
  Alert
} from "react-bootstrap";
import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";
import { StyleSheet, css } from "aphrodite";
import Button from "../../common/Button";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

import { storeUser } from "../../actions/authActions";
import { VerifyUser } from "./VerifyUser";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
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
    textAlign: "center",
    color: "#000"
  },
  clickMe: {
    textAlign: "center"
  },
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  expanded: {
    height: "auto"
  },
  unexpanded: {
    height: 0,
    overflow: "hidden"
  },
  a: {
    fontWeight: 600,
    textDecorationLine: "underline",
    text: "Bold"
  }
});

export class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      securityQ: "",
      securityAns: "",
      username_entered: "false",
      show: true,
      verify: false,
      isexpanded: true,
      errorMsg_onSumbit1: "",
      errorMsg_onVerify: "",
      errorMsg_onSumbit2: "",
      errorMsg_onVerify2: "",
      errorMsg_onSubmit3: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
      errorMsg_onSubmit4: "",
      securityQ2: "",
      securityAns2: "",
      showmsg: false,
      showpwd: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitOne = this.onSubmitOne.bind(this);
    this.onSubmitTwo = this.onSubmitTwo.bind(this);
    this.onSubmit3 = this.onSubmit3.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
    // this.setState({ verify: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitOne = e => {
    e.preventDefault();
    console.log(this.state.username);

    if (this.state.username === "") {
      this.setState({ errorMsg_onSumbit1: "Please enter your username." });
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
            this.setState({ securityQ2: res.data.securityQ2 });
            this.setState({ username_entered: true });
            this.setState({ isexpanded: false });
          } else {
            this.setState({ errorMsg: "ERROR" });
          }
          console.log(this.state.securityQ);
        });
    }
  };

  onSubmitTwo = e => {
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
            if (
              this.state.securityAns === res.data.securityAns &&
              this.state.securityAns2 === res.data.securityAns2
            )
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

  onSubmit3 = e => {
    e.preventDefault();
    console.log(this.state.username);
    // this.username_entered = true;
    console.log(this.state.password);
    // this.props.authenticateUser(user);
    // console.log(`http://127.0.0.1:8000/users-api/${this.state.username}`);
    const password = this.state.password;
    if (this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({ errorMsg_onSubmit3: "Please complete all the fields." });
    } else {
      //is this right way to define not equal to?
      if (this.state.password != this.state.confirmPassword) {
        this.setState({ errorMsg_onSubmit4: "Passwords do not match" });
      } else {
        axios
          .post(
            `http://127.0.0.1:8000/users-api/${this.state.username}/`,
            //password
            {
              password: this.state.password
            }
          )
          .then(res => {
            console.log(res.status);
            console.log(res.data.securityQ);
            if (res.status === 200) {
              console.log("success");
              this.setState({ showpwd: false });
              this.setState({ verify: true });
              this.setState({ showmsg: true });
            } else {
              this.setStatethis.setState({
                errorMsg: "Error"
              });
            }
          });
      }
    }
  };

  handleHide() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div className={css(styles.box)}>
        <h1 className={css(styles.logo)}>Medifast</h1>
        <h3 className={css(styles.logo)}>Password Recovery</h3>

        <div
          className={
            this.state.isexpanded
              ? css(styles.expanded)
              : css(styles.unexpanded)
          }
        >
          <form onSubmit={this.onSubmitOne}>
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
            <Button name="submit" type="submit" onSubmit={this.onSubmitOne} />
            <div className={css(styles.error)}>
              {this.state.errorMsg_onSumbit1}
            </div>
          </form>
        </div>

        {this.username_entered ? (
          <form onSubmit={this.onSubmitTwo}>
            <FormGroup>
              <ControlLabel>{this.state.securityQ}</ControlLabel>
              <FormControl
                className={css(styles.inputBox)}
                type="password"
                name="securityAns"
                label="Security Answer"
                placeholder="Enter your answer here"
                value={this.state.securityAns}
                onChange={this.onChange}
              />
              <br />
              <ControlLabel>{this.state.securityQ2}</ControlLabel>
              <FormControl
                className={css(styles.inputBox)}
                type="password"
                name="securityAns2"
                label="Security Answer"
                placeholder="Enter your answer here"
                value={this.state.securityAns2}
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

        {this.state.verify ? (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Body>
              <div>
                <form onSubmit={this.onSubmit3}>
                  <div
                    className={
                      this.state.showpwd
                        ? css(styles.expanded)
                        : css(styles.unexpanded)
                    }
                  >
                    <FormGroup>
                      <ControlLabel>Enter New Password:</ControlLabel>
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
                      <Button name="submit" type="submit" />
                      <p className={css(styles.error)}>
                        {this.state.errorMsg_onSumbit4}
                      </p>
                      <div className={css(styles.error)}>
                        {this.state.errorMsg_onSumbit3}
                      </div>
                      <div>{this.state.errorMsg_onSumbit2}</div>
                    </FormGroup>
                  </div>

                  <div
                    className={
                      this.state.showmsg
                        ? css(styles.expanded)
                        : css(styles.unexpanded)
                    }
                  >
                    <Alert bsStyle="info">
                      <strong>
                        Password reset successful. Please login{" "}
                        <a href="/login" className={css(styles.a)}>
                          here
                        </a>{" "}
                        with your new password.
                      </strong>
                    </Alert>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}
        {/* // ) : (
        //   <Modal show={this.state.show} onHide={this.handleClose}>
        //     <Modal.Body>
        //       <Alert bsStyle="warning">
        //         <strong>Holy guacamole!</strong> Best check yo self, you're not
        //         looking too good.
        //       </Alert>
        //     </Modal.Body>
        //   </Modal>
//)} */}

        {/* 
          {this.username_entered ? (
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton />
              <Modal.Body >
                <FormGroup>
                  <label>{this.state.securityQ}</label>
                  <FormControl
                    className={css(styles.inputBox)}
                    type="text"
                    name="Security Question Answer"
                    label="Security Question"
                    placeholder="Enter your answer here."
                    value={this.state.securityAns}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Modal.Body>
            </Modal>
          ) : (
            <p>please enter username first</p>
          )}
           */}
      </div>
    );
  }
}

export default connect(
  null,
  { storeUser }
)(ResetPassword);
