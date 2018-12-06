import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { Radio } from "antd";
import LandingNavbar from "../Layout/LandingNavbar";

import coffee from "./coffee.png";
import Button from "../../common/Button";
import { storeUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "5%",
    width: "70%",
    height: "80%",
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
  img: {
    height: "100%"
  },
  register: {
    paddingTop: "15%",
    paddingLeft: "15%",
    paddingRight: "15%"
  }
});

export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      stageOne: true,
      appear: true,
      username: "",
      password: "",
      confirmPassword: "",
      typeOfUser: "",
      email: "szxiner@gmail.com",
      phone_number: 9492288063,
      errorMsg: "",
      securityQ: "DEFAULT",
      securityAns: "DEFAULT",
      securityQ2: "DEFAULT",
      securityAns2: "DEFAULT"
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  nextPage = e => {
    e.preventDefault();
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      this.setState({ errorMsg: "Please complete all the fields." });
    } else if (this.state.username.length < 5) {
      this.setState({
        errorMsg: "Username is too short, please try another username."
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        errorMsg: "Password needs to be longer than 6 characters."
      });
    } else {
      this.setState({ stageOne: false, errorMsg: "" });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.email === "" ||
      this.state.phone_number === "" ||
      this.state.typeOfUser === "" ||
      this.state.securityQ === "" ||
      this.state.securityAns === "" ||
      this.state.securityQ2 === "" ||
      this.state.securityAns2 === ""
    ) {
      this.setState({ errorMsg: "Please complete all the fields." });
    } else {
      if (this.state.password === this.state.confirmPassword) {
        const user = {
          username: this.state.username,
          password: this.state.password,
          //confirmPassword: this.state.confirmPassword,
          typeOfUser: this.state.typeOfUser,
          email: this.state.email,
          phone_number: this.state.phone_number,
          securityQ: this.state.securityQ,
          securityAns: this.state.securityAns,
          securityQ2: this.state.securityQ2,
          securityAns2: this.state.securityAns2
        };
        console.log(user);
        axios
          .post("http://127.0.0.1:8000/users-api/", user)
          .then(res => {
            if (res.status === 201) {
              this.props.storeUser(user);
              // this.props.history.push("/2fa");
              this.props.history.push("/dashboard");
            }
          })
          .catch(() => {
            this.setState({ errorMsg: "Username already exists." });
          });
      } else {
        this.setState({ errorMsg: "Passwords do not match." });
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.setState({});
  };

  render() {
    const { stageOne } = this.state;
    return (
      <div>
        <LandingNavbar />
        <div className={css(styles.box)}>
          <Grid style={{ width: "100%" }}>
            <Row bsStyle="visibleMdBlock" className="show-grid">
              <Col xs={6} md={5} style={{ padding: 0 }}>
                <div className={css(styles.img)}>
                  <img src={coffee} width="100%" height="100%" />
                </div>
              </Col>
              <Col xs={12} md={7}>
                <div className={css(styles.register)}>
                  <h1
                    style={{
                      fontSize: 60,
                      textAlign: "center",
                      color: "#000"
                    }}
                  >
                    Medifast
                  </h1>
                  <br />
                  <div>
                    {stageOne ? (
                      <div>
                        <form onSubmit={this.nextPage}>
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
                          </FormGroup>
                          <div className={css(styles.error)}>
                            {this.state.errorMsg}
                          </div>
                          <Button name="Next" type="submit" />
                        </form>
                      </div>
                    ) : (
                      <div>
                        <form onSubmit={this.onSubmit}>
                          <FormGroup>
                            <ControlLabel>You are a:</ControlLabel>
                            <br />
                            <RadioGroup
                              style={{
                                marginTop: 8,
                                marginBottom: 16,
                                width: "100%"
                              }}
                              name="typeOfUser"
                              onChange={this.onChange}
                              defaultValue=""
                            >
                              <RadioButton value="Doctor">Doctor</RadioButton>
                              <RadioButton value="Patient">Patient</RadioButton>
                              <RadioButton value="Insurance">
                                Insurance Officer
                              </RadioButton>
                            </RadioGroup>
                            <br />
                            <ControlLabel>Email:</ControlLabel>
                            <FormControl
                              className={css(styles.inputBox)}
                              type="email"
                              label="Email address"
                              name="email"
                              placeholder="Enter email"
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                            <br />
                            <ControlLabel>Phone Number:</ControlLabel>
                            <FormControl
                              className={css(styles.inputBox)}
                              type="number"
                              //type="text"
                              //pattern="[0-9]*"
                              label="Phone Number"
                              name="phone_number"
                              placeholder="Enter your phone number"
                              value={this.state.phone_number}
                              maxLength="10"
                              onChange={this.onChange}
                              //onChange={this.onChange}
                              //onChange={event => this.setState({ phone_number: event.target.value.replace(/\D/, '') })}
                            />
                            <br />
                            <div className={css(styles.error)}>
                              {this.state.errorMsg}
                            </div>
                            <Button name="Sign Up" type="submit" />
                          </FormGroup>
                        </form>
                      </div>
                    )}
                  </div>
                  <br />
                  <br />
                  <div style={{ bottom: 0, textAlign: "center" }}>
                    Already have an account?
                    <a href="/Login"> Sign in.</a>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Register.propTypes = { storeUser: PropTypes.func.isRequired };

export default connect(
  null,
  { storeUser }
)(Register);

// <div className={css(styles.box)}>
// <h1 className={css(styles.logo)}>Medifast</h1>
// <br />
// {/*TODO: Create global form*/}
// <form onSubmit={this.onSubmit}>
//   <FormGroup>
//     <ControlLabel>Username:</ControlLabel>
//     <FormControl
//       className={css(styles.inputBox)}
//       type="text"
//       name="username"
//       label="Username"
//       placeholder="Username"
//       value={this.state.username}
//       onChange={this.onChange}
//     />
//     <br />
//     <ControlLabel>Password:</ControlLabel>
//     <FormControl
//       className={css(styles.inputBox)}
//       type="password"
//       name="password"
//       label="Password"
//       placeholder="Password"
//       value={this.state.password}
//       onChange={this.onChange}
//     />
//     <br />
//     <ControlLabel>Confirm Password:</ControlLabel>
//     <FormControl
//       className={css(styles.inputBox)}
//       type="password"
//       name="confirmPassword"
//       label="Confirm Password"
//       placeholder="Confirm Password"
//       value={this.state.confirmPassword}
//       onChange={this.onChange}
//     />
//     <br />
//     <ControlLabel>Email:</ControlLabel>
//     <FormControl
//       className={css(styles.inputBox)}
//       type="email"
//       label="Email address"
//       name="email"
//       placeholder="Enter email"
//       value={this.state.email}
//       onChange={this.onChange}
//     />
//     <br />
//     <ControlLabel>Phone Number:</ControlLabel>
//     <FormControl
//       className={css(styles.inputBox)}
//       type="number"
//       //type="text"
//       //pattern="[0-9]*"
//       label="Phone Number"
//       name="phone_number"
//       placeholder="Enter your phone number"
//       value={this.state.phone_number}
//       maxLength="10"
//       onChange={this.onChange}
//       //onChange={this.onChange}
//       //onChange={event => this.setState({ phone_number: event.target.value.replace(/\D/, '') })}
//     />
//     <br />
//     <ControlLabel>Role:</ControlLabel>
//     <FormControl
//       componentClass="select"
//       placeholder="select"
//       onChange={this.onChange}
//       name="typeOfUser"
//     >
//       <option value="role">Role</option>
//       <option value="Patient">Patient</option>
//       <option value="Doctor">Doctor</option>
//       <option value="Insurance">Insurance Provider</option>
//     </FormControl>
//     <br />

//     <br />
//     <Button name="Sign Up" type="submit" />
//   </FormGroup>
// </form>
// <div className={css(styles.error)}>{this.state.errorMsg}</div>
// </div>

/* <ControlLabel>Security Question</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="securityQ"
            >
              <option>Select Securtiy Question 1</option>
              <option value="What's the name of your first teacher?">
                What's the name of your first teacher?
              </option>
              <option value="What is your dream job?">
                What is your dream job?
              </option>
              <option value="What is your favourite color?">
                What is your favourite color?
              </option>
            </FormControl>
            <br />
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="securityAns"
              label="Security Answer"
              placeholder="Enter your answer here."
              value={this.state.securityAns}
              onChange={this.onChange}
            />
            <br />
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="securityQ2"
            >
              <option>Select Securtiy Question 2</option>
              <option value="What's the name of your first school?">
                What's the name of your first school?
              </option>
              <option value="What's the name of your first pet?">
                What's the name of your first pet?
              </option>
              <option value="What is your favourite food?">
                What is your favourite food?
              </option>
            </FormControl>
            <br />
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              name="securityAns2"
              label="Security Answer"
              placeholder="Enter your answer here."
              value={this.state.securityAns2}
              onChange={this.onChange}
            /> */
