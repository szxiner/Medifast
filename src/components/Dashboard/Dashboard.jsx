import React from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { List, Avatar, Input, Button, Drawer } from "antd";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

import Chat from "../Chat/Chat";
import DashboardSideBar from "./DashboardSideBar";
import LandingNavbar from "../Layout/LandingNavbar";
const Search = Input.Search;

const styles = StyleSheet.create({
  chat: {
    position: "fixed",
    right: 40,
    bottom: 40
  },
  container: {
    position: "relative",
    height: "100%"
  }
});
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      searchedList: [],
      drawer: false,
      childrenDrawer: false,
      activeChat: null,
      onlineStatus: false
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    const { username, type } = auth.user;
    if (type === "Doctor") {
      axios
        .get(`http://127.0.0.1:8000/doctor/bookings?docusername=${username}`)
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            this.setState({ userList: res.data, searchedList: res.data });
          }
        });
    } else if (type === "Patient") {
      axios.get("http://127.0.0.1:8000/doctor/profile").then(res => {
        if (res.status === 200) {
          this.setState({ userList: res.data, searchedList: res.data });
        }
      });
    } else {
      axios.get(`http://127.0.0.1:8000/patient/profile`).then(res => {
        if (res.status === 200) {
          console.log(res.data);
          this.setState({ userList: res.data, searchedList: res.data });
        }
      });
    }
  }

  onSearch = value => {
    if (value === "") {
      this.setState({ searchedList: this.state.userList });
    }
    const filteredList = _.filter(this.state.userList, { Last_Name: value });
    this.setState({ searchedList: filteredList });
  };

  showDrawer = () => {
    this.setState({
      drawer: true
    });
  };

  onClose = () => {
    this.setState({
      drawer: false
    });
  };

  showChildrenDrawer = item => {
    axios
      .get(`http://127.0.0.1:8000/users-api/${item.username}`)
      .then(res => {
        const onlineStatus = moment(res.data.lastLogin).isAfter(
          moment().subtract(30, "m")
        );
        console.log("onlineStatus", onlineStatus);
        this.setState({ onlineStatus: onlineStatus });
      })
      .catch(e => console.log("Error", e));

    this.setState(
      {
        activeChat: item
      },
      () => {
        this.setState({
          childrenDrawer: true
        });
      }
    );
    console.log(this.state.activeChat);
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false
    });
  };

  render() {
    const { auth } = this.props;
    const { username, type } = auth.user;
    const {
      drawer,
      childrenDrawer,
      userList,
      activeChat,
      searchedList,
      onlineStatus
    } = this.state;
    console.log("userList", userList);
    return (
      <div className={css(styles.container)}>
        <LandingNavbar isAuth={true} />
        <DashboardSideBar />
        <div className={css(styles.chat)}>
          <Button
            type="primary"
            size="large"
            icon="mail"
            onClick={this.showDrawer}
          >
            Messages
          </Button>
        </div>
        <Drawer
          title="Chats"
          width={520}
          closable={false}
          onClose={this.onClose}
          visible={drawer}
        >
          <Search
            placeholder="Search"
            onSearch={value => this.onSearch(value)}
            enterButton
          />
          <br />
          <br />
          <List
            itemLayout="horizontal"
            dataSource={searchedList}
            renderItem={item => (
              <List.Item onClick={() => this.showChildrenDrawer(item)}>
                <List.Item.Meta
                  avatar={<Avatar size={48} icon="user" />}
                  title={`${item.First_name} ${item.Last_Name}`}
                />
              </List.Item>
            )}
          />
          <Drawer
            title={`${!!activeChat ? activeChat.Last_Name : ""} (${
              onlineStatus ? "Online" : "Offline"
            })`}
            placement="right"
            width={440}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={childrenDrawer}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <Chat
                sender={username}
                receiver={!!activeChat ? activeChat.username : ""}
              />
            </div>
          </Drawer>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e8e8e8",
              padding: "10px 16px",
              textAlign: "right",
              left: 0,
              background: "#fff",
              borderRadius: "0 0 4px 4px"
            }}
          >
            <Button
              style={{
                marginRight: 8
              }}
              onClick={() => {
                this.setState({ searchedList: userList });
              }}
            >
              Show All
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
