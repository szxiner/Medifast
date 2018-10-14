import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { Icon } from "antd";

import { authenticateUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import Button from "../../common/Button";

import { FormGroup, FormControl, NavItem } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import store from "../../store";
import ReactModal from "react-modal";
import fp from "./fp";
import Button1 from "../../common/Button1";
import { Link } from "react-router-dom";

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
  pwd: {
    fontWeight: 600,
    textAlign: "center",
    alignItems: "center",
    fontsize: 18
  },
  modal: {
    backgroundColor: themeColor.white,
    position: "absolute",
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.grey0,
    padding: 40,
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    width: "60%",
    height: 450
  },
  close: {
    right: 25,
    top: 25,
    position: "absolute"
  }
});

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isAuth: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    store.subscribe(() => {
      this.setState({
        isAuth: store.getState().auth.isAuth
      });
      console.log(this.state.isAuth);
    });
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

  handleClick = e => {
    <Link to="/ForgotPwd" />;
  };

  render() {
    if (this.state.isAuth) {
      console.log("hello");
      return <Redirect to="/dashboard" />;
    }
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
            <br />
          </FormGroup>
        </form>

        {/* Forgot password implementation*/}
        <NavItem eventKey={1} href="/ForgotPwd">
          <div align="center">
            <button className={css(styles.pwd)}> Forgot Password? </button>
          </div>
        </NavItem>
        {/*
        <Modal
          className={css(styles.pwd)}
          open={open}
          onClose={this.onCloseModal}
          center
        >
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
          <Button1 name="submit" type="submit" />
        </Modal>
      </div>
        */}
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  authenticateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { authenticateUser }
)(Login);
