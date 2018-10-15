import React from "react";
import { themeColor } from "../theme/colors";
import { StyleSheet, css } from "aphrodite";
import { SecondaryThemeColor } from "../theme/secondaryColor";

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
  },
  loginButton1: {
    width: "100%",
    color: SecondaryThemeColor.white,
    backgroundColor: SecondaryThemeColor.aegean0,
    borderRadius: 5,
    height: 36,
    ":hover": {
      backgroundColor: SecondaryThemeColor.aegean1
    }
  }
});

// Button.propTypes = { type: PropTypes.string, name: PropTypes.string };

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, type, color } = this.props;
    return (
      <button
        className={css(
          color === "primary" ? styles.loginButton : styles.loginButton1
        )}
        type={type}
      >
        {name}
      </button>
    );
  }
}
