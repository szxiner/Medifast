import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { authUser } from "../../actions/authActions";
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
export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    const token = {
      token: this.state.token
    };

    axios.post("http://127.0.0.1:8000/users-api/2fa/", token).then(res => {
      if (res.status === 200) {
        this.props.history.push("/dashboard");
      } else {
        this.setState({ errorMsg: "Token is not valid" });
      }
    });
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
            <ControlLabel>Enter Authy token:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="number"
              name="token"
              label="token"
              placeholder="token"
              value={this.state.token}
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

Register.propTypes = { authUser: PropTypes.func.isRequired };

export default connect(
  null,
  { authUser }
)(Register);
