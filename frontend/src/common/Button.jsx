import React from "react";
import PropTypes from "prop-types";
import { themeColor } from "../theme/colors";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  loginButton: {
    width: "100%",
    color: themeColor.white,
    backgroundColor: themeColor.aegean0,
    borderRadius: 5,
    height: 36,
    ":hover": {
      backgroundColor: themeColor.aegean1
    }
  }
});

// Button.propTypes = { type: PropTypes.string, name: PropTypes.string };

export default class Button extends React.Component {
  render() {
    const { name, type } = this.props;
    return (
      <button className={css(styles.loginButton)} type={type}>
        {name}
      </button>
    );
  }
}
