import React from "react";
import axios from "axios";
import _ from "lodash";

import { Button, Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";
import BillingCard from "./BillingCard";
import Bill from "./Bill";
const dummyBills = [
  {
    id: 1,
    doctor: "T.J. Miller",
    amount: "$223.12",
    oop: "$151.69",
    date: "May 24, 2018",
    status: "Pending"
  },
  {
    id: 2,
    doctor: "T.J. Miller",
    amount: "$123.81",
    oop: "$76.12",
    date: "July 12, 2018",
    status: "Open"
  },
  {
    id: 3,
    doctor: "Travis Brooks",
    amount: "$450.89",
    oop: "$112.30",
    date: "March 09, 2018",
    status: "Closed"
  },
  {
    id: 4,
    doctor: "Xiner Zhang",
    amount: "$704.99",
    oop: "$271.54",
    date: "March 24, 2018",
    status: "Closed"
  },
  {
    id: 5,
    doctor: "Xiner Zhang",
    amount: "$111.94",
    oop: "$98.39",
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
    this.state = {
      loading: false,
      activeBill: undefined
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {}

  onClick = () => {
    this.setState({ activeBill: undefined });
  };

  handleClick = bill => {
    this.setState({ loading: true }, () => {
      this.setState({ activeBill: bill });
    });
  };

  render() {
    const { activeBill, loading } = this.state;

    return (
      <div className={css(styles.container)}>
        {activeBill ? (
          <div>
            <Bill activeBill={this.state.activeBill} />
          </div>
        ) : (
          <div>
            <div className={css(styles.title)}>Claims</div>
            <br />
            {_.map(dummyBills, bill => {
              return (
                <BillingCard bill={bill} click={() => this.handleClick(bill)} />
              );
            })}
          </div>
        )}
        <br />
        <Button onClick={this.onClick} shape="circle" icon="redo" />
      </div>
    );
  }
}
