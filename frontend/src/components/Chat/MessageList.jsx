import React from "react";
import axios from "axios";

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
      lastRead: ""
    };
  }

  componentWillMount() {
    axios
      .get(`chat/lastRead/${this.props.receiver}`)
      .then(res => this.setState({ lastRead: res.data }));
  }

  render() {
    const { messages, sender, receiver } = this.props;
    console.log("Messages", messages);
    return (
      <div className={css(styles.messageList)}>
        {_.map(messages, message => {
          return <Message message={message} lastRead={this.state.lastRead} />;
        })}
      </div>
    );
  }
}
