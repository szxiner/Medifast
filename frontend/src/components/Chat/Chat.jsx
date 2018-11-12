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
      sendMessage: "",
      typing: false
    };

    this.onChange = this.onChange.bind(this);
    this.sendMessageHandler = this.sendMessageHandler.bind(this);
  }

  componentWillMount() {
    // console.log(`Here ${this.props.sender} and ${this.props.receiver}`);

    this.setState({ message: [] });
    this.waitForSocketConnection(() => {
      const username = !!this.props.auth ? this.props.auth.user.username : "";
      WebSocketInstance.initChatUser(username);
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

  addMessage = message => {
    console.log("In add message", message);
    const self =
      this.props.auth.user.username === message.author ? true : false;
    this.setState({ typing: !self }, () => {
      setTimeout(
        function() {
          this.setState({
            typing: false,
            messages: [...this.state.messages, message]
          });
        }.bind(this),
        1500
      );
    });
  };

  setMessages(messages) {
    console.log("In set messages", messages);
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
    const { messages, sendMessage, typing } = this.state;
    console.log("messages", messages);
    console.log("typing", typing);
    return (
      <div>
        {typing ? <div>typing...</div> : <div />}
        <div className={css(styles.chatMain)}>
          <MessageList
            messages={messages}
            sender={this.props.sender}
            receiver={this.props.receiver}
          />
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
