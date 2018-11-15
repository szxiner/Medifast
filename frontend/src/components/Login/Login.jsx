import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { FormGroup, FormControl, Grid, Row, Col } from "react-bootstrap";

import Button from "../../common/Button";
import GoogleLoginButton from "./GoogleLoginButton";
import holdhand from "./holdhand.png";

import { storeUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "5%",
    width: "70%",
    height: "90%",
    backgroundColor: "#fff",
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  logo: {
    textAlign: "center"
  },
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  forgotpassword: {
    marginTop: 12,
    fontWeight: "bold",
    textDecorationLine: "underline",
    text: "Bold"
  },
  img: {
    height: "100%"
  },
  login: {
    paddingTop: "15%",
    paddingLeft: "15%",
    paddingRight: "15%"
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
          // this.props.history.push("/2fa");
          this.props.history.push("/dashboard");
        }
      })
      .catch(() => {
        this.setState({
          errorMsg: "Username and password does not match. Please try again"
        });
      });

    axios.post(`http://127.0.0.1:8000/users-api/${user.username}/`, {
      lastLogin: moment().format("YYYY-MM-DD HH:mm:ss")
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.setState({ primaryColor: !this.state.primaryColor });
  };

  render() {
    return (
      <div className={css(styles.box)}>
        <Grid style={{ width: "100%" }}>
          <Row bsStyle="visibleMdBlock" className="show-grid">
            <Col xs={12} md={7}>
              <div className={css(styles.login)}>
                <h1 style={{ fontSize: 60, textAlign: "center" }}>Medifast</h1>
                <br />
                <GoogleLoginButton history={this.props.history} />
                <hr />
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
                    <div className={css(styles.error)}>
                      {this.state.errorMsg}
                    </div>

                    <Col xs={10} md={6}>
                      <div align="Left" className={css(styles.forgotpassword)}>
                        <a href="/ResetOption">Forgot Password?</a>
                      </div>
                    </Col>
                    <Col xs={10} md={6}>
                      <Button name="Log in" type="submit" />
                    </Col>
                  </FormGroup>
                </form>
                <br />
                <br />
                <br />
                <div style={{ bottom: 0, textAlign: "center" }}>
                  Do not have an account?
                  <a href="/Register"> Sign up.</a>
                </div>
              </div>
            </Col>
            <Col xs={6} md={5}>
              <div className={css(styles.img)}>
                <img src={holdhand} width="105%" height="100%" />
              </div>
            </Col>
          </Row>
        </Grid>
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
