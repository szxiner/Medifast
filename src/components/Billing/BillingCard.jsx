import React from "react";
import _ from "lodash";

import { Button, Tooltip, Icon, Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

import Badge from "../Insurance/Badge";

const styles = StyleSheet.create({
  container: {
    padding: 4,
    height: 68,
    marginBottom: 4,
    paddingTop: 12,
    paddingLeft: 12,
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
  doctor: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  doctorInit: {
    width: 36,
    height: 36,
    paddingTop: 8,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 2,
    backgroundColor: "#99e6ff",
    color: "#005c99",
    marginRight: 8
  },
  doctorName: {
    paddingTop: 8
  },
  tooltip: {
    marginTop: 6,
    marginLeft: 16
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

  statusButton = () => {
    switch (this.props.bill.status) {
      case "Open":
        return (
          <Button
            style={{ borderRadius: 4 }}
            icon="check-circle"
            type="primary"
            onClick={this.props.click}
          >
            Make Payment
          </Button>
        );
      case "Pending":
        return (
          <div className={css(styles.doctor)}>
            <Button
              style={{ borderRadius: 4 }}
              icon="clock-circle"
              type="dashed"
              disabled
            >
              Claim Pending
            </Button>
            <div className={css(styles.tooltip)}>
              <Tooltip title="Waiting for your insurance officer to approve">
                <Icon type="question-circle" />
              </Tooltip>
            </div>
          </div>
        );
      case "Closed":
        return (
          <Button style={{ borderRadius: 4 }} icon="close-circle" disabled>
            Claim Closed
          </Button>
        );
      default:
        return (
          <Button style={{ borderRadius: 4 }} disabled>
            Primary
          </Button>
        );
    }
  };

  render() {
    const { id, doctor, amount, date, oop, status } = this.props.bill;
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
            <b>{date}</b>
            <div>0000{id}</div>
          </Col>
          <Col span={8}>
            <div className={css(styles.doctor)}>
              <div className={css(styles.doctorInit)}>{doctor.charAt(0)}</div>
              <div className={css(styles.doctorName)}>{doctor}</div>
            </div>
          </Col>
          <Col span={4} style={{ height: "100%" }}>
            <b>{amount}</b>
            <br />
            Total Charge
          </Col>
          <Col span={4} style={{ height: "100%" }}>
            <b>{oop}</b>
            <br />
            After Deductible
          </Col>
          <Col span={4} style={{ height: "100%" }}>
            {/* <Badge content={status} style={status.toLowerCase()} /> */}
            {this.statusButton()}
          </Col>
        </Row>
      </div>
    );
  }
}
