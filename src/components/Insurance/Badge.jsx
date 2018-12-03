import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  badge: {
    background: "linear-gradient(to bottom right, #b5ea60, #00d41a)",
    textAlign: "center",
    textTransform: "uppercase",
    borderRadius: 4,
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    width: "66%",
    marginLeft: "17%",
    marginTop: "4%"
  },
  open: {
    background: "linear-gradient(to bottom right, #b5ea60, #00d41a)",
    width: "40%"
  },
  pending: {
    background: "linear-gradient(to bottom right, #8B40E5, #701DD5)",
    width: "40%"
  },
  closed: {
    background: "linear-gradient(to bottom right, #A7333F, #74121D)",
    width: "40%"
  }
});
export default class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  styledBadge = () => {
    switch (this.props.style) {
      case "open":
        return (
          <div className={css(styles.badge, styles.open)}>
            {this.props.content}
          </div>
        );
      case "pending":
        return (
          <div className={css(styles.badge, styles.pending)}>
            {this.props.content}
          </div>
        );
      case "closed":
        return (
          <div className={css(styles.badge, styles.closed)}>
            {this.props.content}
          </div>
        );
      default:
        return <div className={css(styles.badge)}>{this.props.content}</div>;
    }
  };

  componentDidMount() {}

  render() {
    return <div>{this.styledBadge()}</div>;
  }
}
