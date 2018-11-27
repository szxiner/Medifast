import React from "react";
import axios from "axios";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Icon, Card, Row, Col, data, List } from "antd";
import { themeColor } from "../../theme/colors";
import PatientModal from "./PatientModal";
import DoctorModal from "./DoctorModal";

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
  }
});

// This need to change after api is fixed

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
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
    const { userType } = this.props;
    let viewType;
    if (userType === "Doctor") {
      viewType = "Patient";
    } else {
      viewType = "Doctor";
    }
    this.setState({
      showModal: true,
      activeProfile: user.username
    });
    if (viewType === "Patient") {
      axios.get("http://127.0.0.1:8000/patient/history").then(res => {
        if (res.status === 200) {
          const mediHis = _.filter(res.data, {
            username: this.state.activeProfile
          });
          this.setState({ activeInfo: mediHis });
        }
      });
    } else {
      const docInfo = _.filter(this.state.userList, {
        username: user.username
      });
      this.setState({ activeInfo: docInfo });
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false, activeInfo: [] });
  }

  componentDidMount() {
    const { userType } = this.props;

    if (userType === "Doctor") {
      axios.get("http://127.0.0.1:8000/patient/profile").then(res => {
        if (res.status === 200) {
          console.log(res.data);
          this.setState({ userList: res.data });
        }
      });
    } else if (userType === "Patient") {
      axios.get("http://127.0.0.1:8000/doctor/profile").then(res => {
        if (res.status === 200) {
          this.setState({ userList: res.data });
        }
      });
    }
  }

  render() {
    const { userType } = this.props;

    let viewType;
    if (userType === "Doctor") {
      viewType = "Patient";
    } else {
      viewType = "Doctor";
    }
    {
      _.map(this.state.userList, (user, key) => {
        const data = [
          {
            title: this.state.user.Last_Name,
            content: this.state.user.DOB
          }
        ];
      });
    }
    return (
      <div className={css(styles.innerComponent)}>
        <h3>Available {viewType}</h3>
        <br />
        {/* <div className={css(styles.userList)}>
          <table className={css(styles.table)}>
            <tr className={css(styles.tr)}>
              <th className={css(styles.th)}>
                {viewType === "Patient" ? "Patient" : "Doctor"}
                ID
              </th>
              <th className={css(styles.th)}>Name </th>
              <th className={css(styles.th)}>
                {viewType === "Patient" ? "Gender" : "Specialization"}
              </th>
              <th className={css(styles.th)}>
                {viewType === "Patient" ? "Date of Birth" : "Hospital"}
              </th>
              <th className={css(styles.th)}>More</th>
            </tr> */}
        {/* {_.map(this.state.userList, (user, key) => {
          return (
            <div style={{ background: "#ECECEC", padding: "30px" }}>
              <Card
                title={user.Last_Name}
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
              >
                <p className={css(styles.th)}>{key + 1}</p>
                <p className={css(styles.th)}>
                  {viewType === "Patient" ? user.gender : user.specialization}
                </p>
                <p className={css(styles.th)}>
                  {viewType === "Patient" ? user.DOB : user.Hospital}
                </p>
                <p className={css(styles.more)}>
                  <a onClick={() => this.handleOpenModal(user)}>
                    <Icon type="down" theme="outlined" />
                  </a>
                </p>
              </Card>
            </div>
          ); */}
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
        ){/* </div> */}
        {viewType === "Patient" ? (
          <PatientModal
            showModal={this.state.showModal}
            handleCloseModal={this.handleCloseModal}
            activeProfile={this.state.activeProfile}
            activeInfo={this.state.activeInfo}
          />
        ) : (
          <DoctorModal
            showModal={this.state.showModal}
            handleCloseModal={this.handleCloseModal}
            activeProfile={this.state.activeProfile}
            activeInfo={this.state.activeInfo}
            showAppt={true}
          />
        )}
      </div>
    );
  }
}
