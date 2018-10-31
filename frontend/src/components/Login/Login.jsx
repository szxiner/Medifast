import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

import { storeUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";
import Button from "../../common/Button";
import { FormGroup, FormControl } from "react-bootstrap";
import GoogleLoginButton from "./GoogleLoginButton";

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
  },
  forgotpassword: {
    fontWeight: 600,
    textDecorationLine: "underline",
    text: "Bold",
    fontSize: 16
  }
});

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsg: "",
      primaryColor: true
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

    axios
      .get(`http://127.0.0.1:8000/users-api/?username=${user.username}`)
      .then(res => {
        if (res.data.length !== 0) {
          this.props.storeUser(res.data[0]);
        }
      });
    axios
      .post("http://127.0.0.1:8000/users-api/auth", user)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/2fa");
        }
      })
      .catch(() => {
        this.setState({
          errorMsg: "Username and password does not match. Please try again"
        });
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.setState({ primaryColor: !this.state.primaryColor });
  };

    render() {
    console.log(this.props);
    const { primaryColor } = this.state;
    return (
      <div className={css(primaryColor ? styles.box : styles.box1)}>
        <h1 className={css(primaryColor ? styles.logo : styles.logo1)}>
          Medifast
        </h1>
        <br />
        <form onSubmit={this.onSubmit}>
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
            <br />
            <label>Password:</label>
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
            <br />
            <Button name="Log in" type="submit" />    
            <GoogleLoginButton history={this.props.history} />
          </FormGroup>
        </form>
        <div className={css(styles.error)}>{this.state.errorMsg}</div>

        <div align="Center" className={css(styles.forgotpassword)}>
              <a href="/ResetOption">Forgot Password?</a>
            </div>
        </div>
    );
  }
}

Login.propTypes = {
  storeUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { storeUser }
)(Login);
