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
    marginTop: 18,
    // paddingLeft: 100,
    // marginLeft: 50
    width: "100%",
    display: "flex",
    justifyContent: "center"
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
  },
  box: {
    margin: "auto",
    marginTop: "5%",
    width: "70%",
    height: "90%",
    backgroundColor: "#fff",
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
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
      currentplan: "",
      nopatients: false
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
    const nopatients = false;

    if (userType === "Doctor") {
      if (type === "Doctor") {
        axios
          .get(`http://127.0.0.1:8000/doctor/bookings?docusername=${username}`)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              this.setState({ userList: res.data });
              console.log("Am in in user list of doccc iffff");
            }
            if (res.data.length === 0) {
              {
                this.setState({ nopatients: true });
              }
              console.log("hey noo dataa", this.state.nopatients);
            }
          });
      } else {
        axios.get(`http://127.0.0.1:8000/patient/profile`).then(res => {
          if (res.status === 200) {
            console.log(res.data);
            this.setState({ userList: res.data });
            console.log("Am in in user list of doccc elseeee");
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
          {this.state.nopatients ? (
            <div className={css(styles.box)}>
              <div className={css(styles.error)}>
                <Icon
                  type="book"
                  theme="outlined"
                  style={{ display: "inline-block" }}
                />
                <span style={{ marginLeft: 15 }}>
                  <p style={{ display: "inline-block" }}>
                    Patient details not available
                  </p>
                </span>
              </div>
            </div>
          ) : (
            <div>
              {/* <h3>Available {viewType}s</h3> */}
              {_.map(this.state.userList, user => {
                return (
                  <UserCardPat
                    type={"Doctor"}
                    currentUser={user}
                    activeInfo={user}
                    currentplan={currentplan}
                  />
                );
              })}
            </div>
          )}
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
              return (
                <UserCardPat
                  type={"provider"}
                  currentUser={user}
                  currentplan={currentplan}
                />
              );
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
