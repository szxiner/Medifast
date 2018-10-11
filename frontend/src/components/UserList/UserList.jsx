import React from "react";
import axios from "axios";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";

import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  innerComponent: {
    borderRadius: 5,
    margin: 24,
    padding: 24,
    background: themeColor.white
  },
  userList: {
    background: themeColor.snow0,
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.dark0
  },
  table: {
    width: "100%",
    color: themeColor.dark1
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
  more: {
    fontWeight: "bold",
    color: themeColor.grey1
  }
});
export default class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: []
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/patient/profile").then(res => {
      if (res.status === 200) {
        this.setState({ userList: res.data });
      }
    });
  }

  render() {
    return (
      <div className={css(styles.innerComponent)}>
        <h3>Available Patients</h3>
        <br />
        <div className={css(styles.userList)}>
          <table className={css(styles.table)}>
            <tr className={css(styles.tr)}>
              <th className={css(styles.th)}>Patient ID</th>
              <th className={css(styles.th)}>Name</th>
              <th className={css(styles.th)}>Gender</th>
              <th className={css(styles.th)}>Date of Birth</th>
              <th className={css(styles.th)}>More</th>
            </tr>
            {_.map(this.state.userList, (user, key) => {
              return (
                <tr className={css(styles.tr)}>
                  <th className={css(styles.th)}>{key}</th>
                  <th className={css(styles.th)}>{user.username}</th>
                  <th className={css(styles.th)}>{user.gender}</th>
                  <th className={css(styles.th)}>{user.DOB}</th>
                  <th className={css(styles.more)}>. . . </th>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}
