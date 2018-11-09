import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Button } from "antd";

const styles = StyleSheet.create({
  receiveMessage: {},
  sendMessage: {}
});
export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { messages } = this.props;
    console.log(messages);
    return (
      <div>
        {_.map(messages, message => {
          return (
            <div>
              {message.author}: {message.content}
            </div>
          );
        })}
      </div>
    );
  }
}
