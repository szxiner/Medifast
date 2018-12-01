import React from "react";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { Divider } from "antd";

import { Icon } from "antd";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import billing from "./billing.css";
const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "5%",
    width: "80%",
    height: "90%",
    backgroundColor: "#fff",
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  innerbox: {
    width: "auto",
    height: "auto",
    backgroundColor: "#fff",
    color: themeColor.aegean2,
    padding: "18px",
    borderColor: themeColor.grey3,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  }
});

class Billing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myAppts: []
    };
  }

  render() {
    const { auth } = this.props;
    const { myAppts } = this.state;
    return (
      <div>
        <div className={css(styles.box)}>
          <div className={css(styles.innerbox)}>
            <h2
              style={{
                fontSize: 32,
                textAlign: "left",
                fontFamily: "Acme, sans-serif"
              }}
            >
              Outstanding Bills
            </h2>
            <Divider />
            <p>the outstanding bills will be displayed here</p>
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className={css(styles.box)}>
          <div className={css(styles.innerbox)}>
            <h2
              style={{
                fontSize: 32,
                textAlign: "left",
                fontFamily: "Acme, sans-serif"
              }}
            >
              Previous Bills
            </h2>
            <Divider />
            <p>the outstanding bills will be displayed here</p>
            <br />
            <br />
            <br />
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
)(Billing);
