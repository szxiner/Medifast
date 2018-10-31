import React from "react";
import { themeColor } from "../theme/colors";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  loginButton: {
    width: "100%",
    fontWeight: "bold",
    color: themeColor.white,
    backgroundColor: "#1890ff",
    borderRadius: 5,
    height: 36,
    ":hover": {
      backgroundColor: "#40a9ff"
    }
  }
});

// Button.propTypes = { type: PropTypes.string, name: PropTypes.string };

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, type } = this.props;
    return (
      <button className={css(styles.loginButton)} type={type}>
        {name}
      </button>
    );
  }
}
