import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Icon } from "antd";

import { themeColor } from "../../theme/colors";
import MyCalendar from "./Calendar";
const styles = StyleSheet.create({
  appointment: {},
  box: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  calendar: {},
  confirm: {},
  title: {
    fontSize: 28,
    color: themeColor.dark2
  },
  more: {
    right: "10%",
    position: "absolute"
  }
});

export default class AppointModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarExpanded: true,
      timeExpanded: false,
      confirmExpanded: false
    };
  }

  render() {
    const {
      showModal,
      handleCloseModal,
      activeProfile,
      activeInfo
    } = this.props;

    return (
      <div className={css(styles.appointment)}>
        <div className={css(styles.calendar, styles.box)}>
          <MyCalendar />
        </div>
        <div className={css(styles.confirm, styles.box)}>
          <p className={css(styles.title)}>
            CONFIRM
            <a className={css(styles.more)}>
              <Icon type="down" theme="outlined" />
            </a>
          </p>
        </div>
      </div>
    );
  }
}
