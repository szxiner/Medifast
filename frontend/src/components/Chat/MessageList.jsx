import React from "react";
import axios from "axios";
import moment from "moment";

import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import Message from "./Message";

const styles = StyleSheet.create({
  messageList: {
    height: 600,
    overflow: "scroll"
  }
});
export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRead: "",
      read: null
    };
  }

  componentDidMount() {
    this.forceUpdate();
    const { messages, sender, receiver } = this.props;
    if (messages.length !== 0) {
      const messageLength = messages.length;
      axios.get(`chat/lastRead/${receiver}`).then(res =>
        this.setState({ lastRead: res.data }, () => {
          const lastMessage = messages[messageLength - 1];
          console.log("lastRead", this.state.lastRead);
          console.log("lastMessage", lastMessage);
          const createdAt = moment(
            lastMessage.created_at,
            "YYYY-MM-DD HH:mm:ss.SSSSZ"
          );
          const isRead = moment(this.state.lastRead).isAfter(createdAt);
          this.setState({ read: isRead });
        })
      );
    }
  }

  render() {
    const { messages, sender, receiver } = this.props;
    console.log("Messages", messages);
    return (
      <div className={css(styles.messageList)}>
        {_.map(messages, message => {
          return <Message message={message} lastRead={this.state.lastRead} />;
        })}
        {this.props.onlineStatus
          ? "Every thing is seen"
          : "Latest message has not been seen yet"}
      </div>
    );
  }
}
