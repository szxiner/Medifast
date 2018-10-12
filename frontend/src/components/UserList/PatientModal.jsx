import React from "react";
import _ from "lodash";
import ReactModal from "react-modal";
import { StyleSheet, css } from "aphrodite";
import { Icon } from "antd";
import { List } from "react-content-loader";

import { themeColor } from "../../theme/colors";

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
    mariginRight: "20%",
    width: "60%",
    height: 450
  },
  close: {
    right: 25,
    top: 25,
    position: "absolute"
  }
});

export default class Patient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showModal,
      handleCloseModal,
      activeProfile,
      activeInfo
    } = this.props;

    return (
      <div>
        <ReactModal
          isOpen={showModal}
          contentLabel="Patient Detail"
          onRequestClose={handleCloseModal}
          className={css(styles.modal)}
        >
          <a onClick={handleCloseModal} className={css(styles.close)}>
            <Icon type="close" theme="outlined" />
          </a>
          <h3>Medical History for {activeProfile}</h3>
          <br />
          <table className={css(styles.table)}>
            <tr className={css(styles.tr)}>
              <th className={css(styles.th)}>Issue</th>
              <th className={css(styles.th)}>Date</th>
              <th className={css(styles.th)}>Doctor</th>
            </tr>
            {_.map(activeInfo, info => {
              return (
                <tr className={css(styles.tr)}>
                  <th className={css(styles.th)}>{info.issue}</th>
                  <th className={css(styles.th)}>{info.date}</th>
                  <th className={css(styles.th)}>{info.doctor}</th>
                </tr>
              );
            })}
          </table>
        </ReactModal>
      </div>
    );
  }
}
