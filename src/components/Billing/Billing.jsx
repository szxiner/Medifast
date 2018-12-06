import React from "react";
import axios from "axios";
import _ from "lodash";

import { Button, Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

import BillingCard from "./BillingCard";
import Bill from "./Bill";

const styles = StyleSheet.create({
  container: {
    marginTop: "2%",
    marginLeft: "4%",
    marginRight: "4%"
  },
  title: {
    fontSize: "26px",
    fontFamily: "Crimson Text, serif",
    fontWeight: "500",
    fontWeight: "bold",
    marginBottom: 4
  },
  cols: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8
  }
});
class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      loading: false,
      activeBill: undefined
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { auth } = this.props;
    const { username } = auth.user;
    axios.get(`/patient/bill?username=${username}`).then(res => {
      let data = [];
      _.forEach(res.data.charge_sheet, sheet => {
        const charge = {
          id: sheet[0],
          doctor: sheet[1] + " " + sheet[2],
          date: sheet[3],
          amount: sheet[4],
          oop: sheet[4] * 0.5,
          status: sheet[5]
        };
        data = [...data, charge];
      });
      console.log("Bill date", data);
      this.setState({ bills: data });
    });
  }

  onClick = () => {
    this.setState({ activeBill: undefined, bills: [] });

    const { auth } = this.props;
    const { username } = auth.user;
    axios.get(`/patient/bill?username=${username}`).then(res => {
      let data = [];
      _.forEach(res.data.charge_sheet, sheet => {
        const charge = {
          id: sheet[0],
          doctor: sheet[1] + " " + sheet[2],
          date: sheet[3],
          amount: sheet[4],
          oop: sheet[4] * 0.5,
          status: sheet[5]
        };
        data = [...data, charge];
      });
      this.setState({ bills: data });
    });
  };

  handleClick = bill => {
    this.setState({ loading: true }, () => {
      this.setState({ activeBill: bill });
    });
  };

  render() {
    const { bills, activeBill, loading } = this.state;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.title)}>
          <Row>
            <Col span={23}>Claims</Col>
            <Col span={1}>
              <Button onClick={this.onClick} shape="circle" icon="redo" />
            </Col>
          </Row>
        </div>
        {activeBill ? (
          <div>
            <Bill activeBill={this.state.activeBill} />
          </div>
        ) : (
          <div>
            <div className={css(styles.cols)}>
              <Row>
                <Col span={4}>Date and ID</Col>
                <Col span={8}>Doctor Name</Col>
                <Col span={4}>Total Charge</Col>
                <Col span={4}>After Deductible</Col>
                <Col span={4}>Status</Col>
              </Row>
            </div>

            {_.map(bills, bill => {
              return (
                <BillingCard bill={bill} click={() => this.handleClick(bill)} />
              );
            })}
          </div>
        )}
        <br />
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
