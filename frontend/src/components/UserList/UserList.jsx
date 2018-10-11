import React from "react";
import axios from "axios";
import _ from "lodash";
import ReactModal from "react-modal";
import { StyleSheet, css } from "aphrodite";
import { Icon } from "antd";
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
    textAlign: "center",
    fontWeight: "bold",
    color: themeColor.dark1
  },
  modal: {
    backgroundColor: themeColor.white,
    position: "absolute",
    border: "1px solid",
    borderRaduis: 5,
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
export default class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      modal: false,
      activeProfile: null,
      activeInfo: []
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(user) {
    this.setState({
      showModal: true,
      activeProfile: user.username
    });

    axios.get("http://127.0.0.1:8000/patient/history").then(res => {
      if (res.status === 200) {
        const mediHis = _.filter(res.data, {
          username: this.state.activeProfile
        });
        this.setState({ activeInfo: mediHis });
      }
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false, activeInfo: [] });
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/patient/profile").then(res => {
      console.log(res);
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
                  <th className={css(styles.th)}>{key + 1}</th>
                  <th className={css(styles.th)}>{user.username}</th>
                  <th className={css(styles.th)}>{user.gender}</th>
                  <th className={css(styles.th)}>{user.DOB}</th>
                  <th className={css(styles.more)}>
                    <a onClick={() => this.handleOpenModal(user)}>
                      <Icon type="down" theme="outlined" />
                    </a>
                  </th>
                </tr>
              );
            })}
          </table>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Patient Detail"
          onRequestClose={this.handleCloseModal}
          className={css(styles.modal)}
        >
          <a onClick={this.handleCloseModal} className={css(styles.close)}>
            <Icon type="close" theme="outlined" />
          </a>
          <h3>Medical History for {this.state.activeProfile}</h3>
          <br />
          <table className={css(styles.table)}>
            {_.map(this.state.activeInfo, info => {
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
