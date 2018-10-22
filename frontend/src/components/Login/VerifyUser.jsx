import React from "react";
import { FormGroup, FormControl, NavItem, ControlLabel } from "react-bootstrap";
import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";
import { StyleSheet, css } from "aphrodite";
import Button from "../../common/Button";
import PropTypes from "prop-types";
import axios from "axios";
import ResetPassword from "./ResetPassword";
import { connect } from "react-redux";

import { storeUser } from "../../actions/authActions";

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
  }
});

export class VerifyUser extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={css(styles.box)}>
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <ControlLabel>
              Hello {this.props.username}
              !!
            </ControlLabel>
            <ControlLabel>
              Hello {this.props.securityQ}
              !!
            </ControlLabel>

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
          <Button name="submit" type="submit" onSubmit={this.onSubmit} />
        </form>
      </div>
    );
  }
}
export default connect(
  null,
  { storeUser }
)(VerifyUser);
