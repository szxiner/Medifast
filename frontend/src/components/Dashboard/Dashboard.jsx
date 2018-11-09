import React from "react";
import { StyleSheet, css } from "aphrodite";
import { Button, Drawer } from "antd";
import DashboardSideBar from "./DashboardSideBar";
import Chat from "../Chat/Chat";

const styles = StyleSheet.create({
  chat: {
    position: "absolute",
    right: 40,
    bottom: 40
  }
});
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false
    };
  }

  componentDidMount() {}

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

  render() {
    return (
      <div>
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
          title="Messages"
          placement="right"
          width={440}
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawer}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <Chat />
          </div>
        </Drawer>
      </div>
    );
  }
}
