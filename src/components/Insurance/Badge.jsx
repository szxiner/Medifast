import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  badge: {
    background: "linear-gradient(to bottom right, #b5ea60, #00d41a)",
    textTransform: "uppercase",
    borderRadius: 4,
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    width: "66%",
    marginLeft: "17%",
    marginTop: "4%"
  }
});
export default class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div className={css(styles.badge)}>{this.props.content}</div>;
  }
}
