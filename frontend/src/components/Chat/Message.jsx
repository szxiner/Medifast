import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

import { Button } from "antd";

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
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { message, auth } = this.props;
    const { username } = auth.user;
    const self = username === message.author ? true : false;
    console.log("hey lol", message);
    return (
      <div style={{ width: "100%", height: 60 }}>
        <div style={self ? { textAlign: "right" } : { textAlign: "left" }}>
          {message.author}:
        </div>
        <div className={self ? css(styles.messageSelf) : css(styles.message)}>
          {message.content}
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
