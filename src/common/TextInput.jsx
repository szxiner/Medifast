import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  inputBox: {
    // borderRadius: 3,
    // width: 280,
    // height: 20,
    // margin: 5,
  }
});

export default class TextInput extends React.Component {
  render() {
    const { input, label, touched, error, type } = this.props;
    return (
      <div>
        <label>{label}</label>
        <div>
          <input
            className={css(styles.inputBox)}
            {...input}
            placeholder={label}
            type={type}
          />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}
