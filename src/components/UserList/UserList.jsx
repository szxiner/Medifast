import React from "react";
import axios from "axios";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import { Icon } from "antd";
import UserCard from "./UserCard";
import UserCardDoc from "./UserCardDoc";
import UserCardPat from "./UserCardPat";

const styles = StyleSheet.create({
  innerComponent: {
    borderRadius: 5,
    margin: 24
    // padding: 24
    // background: themeColor.white
  },
  error: {
    width: "85%",
    backgroundColor: themeColor.white,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 120,
    paddingBottom: 120,
    fontSize: 28,
    margin: "5%"
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

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      modal: false,
      activeProfile: null,
      activeInfo: [],
      currentplan: ""
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(user) {
    const { userType, currentUser } = this.props;
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
    const { userType, auth } = this.props;
    const { username, type } = auth.user;
    if (userType === "Doctor") {
      if (type === "Doctor") {
        axios
          .get(`http://127.0.0.1:8000/doctor/bookings?docusername=${username}`)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              this.setState({ userList: res.data });
            }
          });
      } else {
        axios.get(`http://127.0.0.1:8000/patient/profile`).then(res => {
          if (res.status === 200) {
            console.log(res.data);
            this.setState({ userList: res.data });
          }
        });
        axios
          .get(`http://127.0.0.1:8000/insRec/recommend/${username}`)
          .then(res => {
            if (res.status === 200) {
              this.setState({ currentplan: res.data });
            }
          });
      }
    } else if (userType === "Patient") {
      axios.get("http://127.0.0.1:8000/doctor/profile").then(res => {
        if (res.status === 200) {
          this.setState({ userList: res.data });
        }
      });
    }
  }

  render() {
    const { userType, currentplan } = this.props;
    let viewType;
    if (userType === "Doctor") {
      viewType = "Patient";
    } else {
      viewType = "Doctor";
    }
    {
      console.log("user type", userType);
    }
    if (userType === "Doctor")
      return (
        <div className={css(styles.innerComponent)}>
          {/* {this.state.userList.length === 0 ? (
            <div>
              <div className={css(styles.error)}>
                <Icon type="book" theme="outlined" />
                <span style={{ marginLeft: 15 }}>
                  No available appointment found.
                </span>
              </div>
            </div>
          ) : ( */}
          <div>
            {/* <h3>Available {viewType}s</h3> */}
            {_.map(this.state.userList, user => {
              return (
                <UserCardPat
                  type={"Patient"}
                  currentUser={user}
                  activeInfo={user}
                  currentplan={currentplan}
                />
              );
            })}
          </div>
          {/* )} */}
        </div>
      );
    if (userType === "Patient")
      return (
        <div className={css(styles.innerComponent)}>
          {/* {this.state.userList.length === 0 ? (
            <div>
              <div className={css(styles.error)}>
                <Icon type="book" theme="outlined" />
                <span style={{ marginLeft: 15 }}>
                  No available appointment found.
                </span>
              </div>
            </div>
          ) : ( */}
          <div>
            {/* <h3>Available {viewType}s</h3> */}
            {_.map(this.state.userList, user => {
              return (
                <UserCardDoc
                  type={"Doctor"}
                  currentUser={user}
                  activeInfo={user}
                />
              );
            })}
          </div>
          {/* )} */}
        </div>
      );
    if (userType === "Insurance")
      return (
        <div className={css(styles.innerComponent)}>
          {/* {this.state.userList.length === 0 ? (
            <div>
              <div className={css(styles.error)}>
                <Icon type="book" theme="outlined" />
                <span style={{ marginLeft: 15 }}>
                  No available appointment found.
                </span>
              </div>
            </div>
          ) : ( */}
          <div>
            {/* <h3>Available {viewType}s</h3> */}
            {_.map(this.state.userList, user => {
              return <UserCard type={"provider"} currentUser={user} />;
            })}
          </div>
          )
        </div>
      );
  }
}

UserList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserList);
