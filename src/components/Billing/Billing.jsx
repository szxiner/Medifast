import React from "react";
import axios from "axios";
import _ from "lodash";

import { Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";
import BillingCard from "./BillingCard";

const dummyBills = [
  {
    id: 1,
    doctor: "T.J. Miller",
    amount: "$151.69",
    date: "May 24, 2018",
    status: "Pending"
  },
  {
    id: 2,
    doctor: "T.J. Miller",
    amount: "$76.12",
    date: "July 12, 2018",
    status: "Open"
  },
  {
    id: 3,
    doctor: "Travis Brooks",
    amount: "$112.30",
    date: "March 09, 2018",
    status: "Closed"
  },
  {
    id: 4,
    doctor: "Xiner Zhang",
    amount: "$271.54",
    date: "March 24, 2018",
    status: "Closed"
  },
  {
    id: 5,
    doctor: "Xiner Zhang",
    amount: "$98.39",
    date: "October 11, 2018",
    status: "Open"
  }
];

const styles = StyleSheet.create({
  container: {
    marginTop: "2%",
    marginLeft: "4%",
    marginRight: "4%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.title)}>Claims</div>
        <br />
        <Row>
          <Col span={4}>Claim ID</Col>
          <Col span={8}>Doctor</Col>
          <Col span={4}>Amount</Col>
          <Col span={4}>Date</Col>
          <Col span={4}>Status</Col>
        </Row>
        <br />
        {_.map(dummyBills, bill => {
          return <BillingCard bill={bill} />;
        })}
      </div>
    );
  }
}
