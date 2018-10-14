import React from "react";
import { themeColor } from "../theme/colors";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  submitButton: {
    width: "50%",
    color: themeColor.white,
    backgroundColor: themeColor.aegean0,
    borderRadius: 2,
    height: 30,
    position: "center",
    ":hover": {
      backgroundColor: themeColor.aegean1
    }
  }
});

// Button.propTypes = { type: PropTypes.string, name: PropTypes.string };

export default class Button1 extends React.Component {
  render() {
    const { name, type } = this.props;
    return (
      <div align="center">
        <button className={css(styles.submitButton)} type={type}>
          {name}
        </button>
      </div>
    );
  }
}
