import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import store from "../../store";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  sideBar: {
    height: "100%",
    width: "20%",
    backgroundColor: themeColor.white
  },
  table: {
    width: "100%"
  },
  tr: {
    height: 50,
    borderBottom: "1px solid black"
  }
});

export default class DashboardSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={css(styles.sideBar)}>
        <table className={css(styles.table)}>
          <tr className={css(styles.tr)}>Option 1</tr>
          <tr className={css(styles.tr)}>Option 2</tr>
          <tr className={css(styles.tr)}>Option 3</tr>
          <tr className={css(styles.tr)}>Option 4</tr>
        </table>
      </div>
    );
  }
}
