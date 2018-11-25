import React from "react";
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
    this.state = {};
  }

  render() {
    const { messages } = this.props;
    console.log("Messages", messages);
    return (
      <div className={css(styles.messageList)}>
        {_.map(messages, message => {
          return <Message message={message} />;
        })}
      </div>
    );
  }
}
