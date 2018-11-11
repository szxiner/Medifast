import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Button, Input } from "antd";
import { connect } from "react-redux";

import WebSocketInstance from "./WebSocket";
import MessageList from "./MessageList";

const { TextArea } = Input;

const styles = StyleSheet.create({
  chatBox: {},
  chatForm: {
    width: "90%",
    position: "absolute",
    bottom: 12
  },
  chatButton: {
    position: "absolute",
    bottom: 12,
    right: 12
  }
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      sendMessage: ""
    };

    this.onChange = this.onChange.bind(this);
    this.sendMessageHandler = this.sendMessageHandler.bind(this);
  }

  componentWillMount() {
    WebSocketInstance.connect(
      this.props.sender,
      this.props.receiver
    );
    this.setState({ message: [] });
    this.waitForSocketConnection(() => {
      const username = !!this.props.auth ? this.props.auth.user.username : "";
      WebSocketInstance.initChatUser(username);
      console.log("ho");
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      WebSocketInstance.fetchMessages(this.props.sender, this.props.receiver);
    });
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse() });
  }

  sendMessageHandler = e => {
    e.preventDefault();
    const username = !!this.props.auth ? this.props.auth.user.username : "";
    const messageObject = {
      sender: username,
      receiver: this.props.receiver,
      text: this.state.sendMessage
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      sendMessage: ""
    });
  };

  onChange = e => {
    this.setState({ sendMessage: e.target.value });
    console.log(this.state.sendMessage);
  };

  render() {
    const { messages, sendMessage } = this.state;
    console.log("messages", messages);
    console.log("sendMessage", sendMessage);
    console.log(this.props);
    return (
      <div>
        {this.props.sender} chating with {this.props.receiver}
        <div className={css(styles.chatMain)}>
          <MessageList messages={messages} />
        </div>
        <div className={css(styles.chatForm)}>
          <TextArea
            rows={4}
            value={sendMessage}
            onChange={this.onChange}
            onPressEnter={this.sendMessageHandler}
          />
          <div className={css(styles.chatButton)}>
            <Button
              type="primary"
              shape="circle"
              icon="enter"
              onClick={this.sendMessageHandler}
            />
          </div>
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
)(Chat);
