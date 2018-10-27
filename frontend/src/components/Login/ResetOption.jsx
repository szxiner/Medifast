import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { storeUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";
import { Button } from "react-bootstrap";

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
  wellStyles: {
    maxWidth: 400,
    margin: "0 auto 10px"
  }
});

export default class ResetOption extends React.Component {
  constructor() {
    super();
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
  }
  onSubmit2 = e => {
    e.preventDefault();
    this.props.history.push("/ResetPassword");
  };

  onSubmit1 = e => {
    e.preventDefault();
    this.props.history.push("/EmailReset");
  };

  render() {
    return (
      <div className={css(styles.box)}>
        <h1 className={css(styles.logo)}>Medifast</h1>
        <br />
        <form onSubmit={this.onSubmit1}>
          <div className="wellStyles">
            <Button
              bsStyle="primary"
              bsSize="large"
              block
              type="submit"
              onSubmit={this.onSubmit1}
            >
              Reset to new password through Email
            </Button>
          </div>
        </form>
        <br />
        <p align="center">OR</p>
        <br />
        <form onSubmit={this.onSubmit2}>
          <div className="wellStyles">
            <Button
              bsSize="large"
              onSubmit={this.onSubmit1}
              type="submit"
              block
            >
              Retrive old password using Security Question
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
