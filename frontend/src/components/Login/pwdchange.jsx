import React from "react";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";
import Button from "../../common/Button";
import { connect } from "react-redux";
import { Icon } from "antd";

const styles = StyleSheet.create({
  // box: {
  //   width: "90%",
  //   margin: "4%",
  //   backgroundColor: themeColor.white,
  //   borderRadius: 8,
  //   padding: 36,
  //   "@media (max-width: 600px)": {
  //     // TODO: Not responsive for mobile. Will Fix later
  //   }
  // },
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
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "auto",
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
  },
  a: {
    fontWeight: 600,
    textDecorationLine: "underline",
    text: "Bold",
    fontSize: 22
  },
  resetmessage: {
    fontSize: 22
  },
  expanded: {
    height: 150
  },
  unexpanded: {
    height: 0,
    overflow: "hidden"
  }
});
class pwdchange extends React.Component {
  constructor() {
    super();
    this.state = {
      isexpanded: true,
      password: "",
      username_entered: "",
      isSuccess: false,
      show: true,
      showmsg: false,
      confirmPassword: ""
    };
    this.onSubmit3 = this.onSubmit3.bind(this);
    this.onclick = this.onclick.bind(this);
  }
  onclick = e => {
    e.preventDefault();
    this.setState({ show: true });
    this.setState({ showmsg: false });
  };
  onSubmit3 = e => {
    e.preventDefault();
    //this.setState({ user: this.state.username });

    console.log(this.state.user);
    // this.setState({ username: username });
    console.log(this.state.username);

    // this.props.authenticateUser(user);
    // console.log(`http://127.0.0.1:8000/users-api/${this.state.username}`);
    //const password;
    this.setState({ password: this.state.password });
    if (this.state.password === "" || this.state.confirmPassword === "") {
      this.setState({
        errorMsg_onSubmit3: "Please complete all the fields."
      });
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
            console.log(this.state.password);
            console.log(res.data.securityQ);
            if (res.status === 200) {
              console.log("success");
              this.setState({ show: false });
              this.setState({ showmsg: true });
            } else {
              this.setState({
                errorMsg: "Error"
              });
            }
          });
      }
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { auth } = this.props;
    const { username } = auth.user;
    this.state.username = username;
    return (
      <div className={css(styles.box)}>
        <div
          className={
            this.state.show ? css(styles.expanded) : css(styles.unexpanded)
          }
        >
          <div align="Center">
            <h2>Password Change</h2>
          </div>
          <form onSubmit={this.onSubmit3}>
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
            </FormGroup>
          </form>
        </div>

        <div>
          <div
            className={
              this.state.showmsg ? css(styles.expanded) : css(styles.unexpanded)
            }
          >
            <div align="center">
              <p1>Pasword changed Successfully</p1>
              <form onSubmit={this.onclick}>
                <Icon type="like" theme="outlined" onclick={this.onclick} />
              </form>
            </div>
          </div>
        </div>
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
)(pwdchange);
