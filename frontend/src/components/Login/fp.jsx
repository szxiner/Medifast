import React from "react";
import _ from "lodash";
import ReactModal from "react-modal";
import { StyleSheet, css } from "aphrodite";
import { Icon } from "antd";
import { themeColor } from "../../theme/colors";
import { FormGroup, FormControl } from "react-bootstrap";

const styles = StyleSheet.create({
  table: {
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.dark0,
    width: "100%",
    color: themeColor.dark1,
    background: themeColor.snow0
  },
  tr: {
    fontWeight: "normal",
    padding: 4,
    borderBottom: "1px solid",
    borderColor: themeColor.grey0
  },
  th: {
    padding: 4,
    fontWeight: "normal"
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

export default class fp extends React.Component {
  render() {
    return (
      <body className={css(styles.modal)}>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </body>
    );
  }
}
