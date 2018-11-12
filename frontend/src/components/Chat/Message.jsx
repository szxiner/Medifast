import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  message: {
    margin: 4,
    width: "60%",
    float: "left",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    backgroundColor: "#E3ECFF"
  },
  messageSelf: {
    margin: 4,
    float: "right",
    width: "60%",
    alignItems: "right",
    border: "1px solid",
    borderColor: "#E3ECFF",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    backgroundColor: "#fff"
  }
});
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: null
    };
  }

  componentDidMount() {
    const { message, auth, receiver } = this.props;
    console.log("receiver", receiver);
    const createdAt = moment(
      message.created_at,
      "YYYY-MM-DD HH:mm:ss.SSSSZ"
    ).subtract(5, "hours");
    console.log("created at: ", createdAt);
    console.log("lastRead", this.props.lastRead);
    const isRead = moment(this.props.lastRead).isAfter(createdAt);
    this.setState({ read: isRead });
  }

  render() {
    const { message, auth } = this.props;
    const { username } = auth.user;
    const self = username === message.author ? true : false;
    return (
      <div style={{ width: "100%", height: 60 }}>
        <div className={self ? css(styles.messageSelf) : css(styles.message)}>
          {message.content}
        </div>
        <div>
          {!!self && this.state.read !== null ? (
            <div style={{ textAlign: "right" }}>
              {!!this.state.read ? "Read" : "Not Seen Yet"}
            </div>
          ) : (
            <div />
          )}
        </div>
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
)(Message);
