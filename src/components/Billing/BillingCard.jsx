import React from "react";
import _ from "lodash";

import { Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

import Badge from "../Insurance/Badge";

const styles = StyleSheet.create({
  container: {
    padding: 4,
    height: 52,
    marginBottom: 4,
    paddingTop: 8,
    alignItems: "center",
    transition: "all 0.3s ease",
    ":hover": {
      "-webkit-transform": "scale(1.05)",
      " -ms-transform": "scale(1.05)",
      transform: "scale(1.05)"
    }
  },
  containerOdd: {
    backgroundColor: "#fff"
  },
  containerEven: {
    backgroundColor: "#F9FFFE"
  },
  doctorName: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  doctorInit: {
    width: 32,
    height: 32,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 2,
    backgroundColor: "#99e6ff",
    color: "#005c99",
    marginRight: 8
  }
});
export default class BillingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  isOdd = num => {
    return num % 2;
  };

  render() {
    const { id, doctor, amount, date, status } = this.props.bill;
    return (
      <div
        className={
          !this.isOdd(id)
            ? css(styles.container, styles.containerOdd)
            : css(styles.container, styles.containerEven)
        }
      >
        <Row style={{ height: "100%" }}>
          <Col span={4} style={{ height: "100%" }}>
            <div style={{ top: "50%" }}>{id}</div>
          </Col>
          <Col span={8} style={{ height: "100%" }}>
            <div className={css(styles.doctorName)}>
              <div className={css(styles.doctorInit)}>{doctor.charAt(0)}</div>
              {doctor}
            </div>
          </Col>
          <Col span={4} style={{ height: "100%" }}>
            <b>{amount}</b>
          </Col>
          <Col span={4} style={{ height: "100%" }}>
            {date}
          </Col>
          <Col span={4} style={{ height: "100%" }}>
            <Badge content={status} style={status.toLowerCase()} />
          </Col>
        </Row>
      </div>
    );
  }
}
