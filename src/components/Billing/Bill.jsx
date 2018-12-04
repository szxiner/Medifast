import React, { Component } from "react";
import moment from "moment";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { Button, Row, Col } from "antd";

import PaypalExpressBtn from "react-paypal-express-checkout";

import PaymentForm from "./PaymentForm";

import business from "./business.svg";
import notes from "./notes.svg";
import loading from "./loading.gif";
import Axios from "axios";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 4,
    height: "100%",
    padding: "2%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  amount: { textAlign: "right" },
  oop: { fontSize: 24, fontWeight: "bold" },
  instruction: {
    marginTop: "12%",
    textAlign: "center",
    marginBottom: "15%",
    fontSize: 20,
    fontWeight: "bold"
  },
  process: {
    textAlign: "center",
    fontSize: 16,
    marginTop: "12%",
    marginBottom: "12%"
  }
});
export class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      paid: false,
      payWithCard: false,
      processing: false
    };
  }

  componentDidMount() {
    console.log(this.props.activeBill);
    this.setState({
      amount: this.props.activeBill.oop
    });
    this.payWithCard = this.payWithCard.bind(this);
  }

  payWithCard = () => {
    this.setState({ payWithCard: true });
  };

  render() {
    const { activeBill } = this.props;
    const { amount, paid, payWithCard, processing } = this.state;

    const sleep = time => {
      return new Promise(resolve => setTimeout(resolve, time));
    };

    const onSuccess = payment => {
      axios.post("/patient/bill", { ref_no: this.props.activeBill.id });
      this.setState({ processing: true }, () => {
        sleep(5000).then(() => {
          this.setState({ paid: true, processing: false });
        });
      });
      //   console.log("Payment successful!", payment);
    };

    const onCancel = data => {
      console.log("Payment cancelled!", data);
    };

    const onError = err => {
      console.log("Error!", err);
    };

    const env = "sandbox";
    const currency = "USD";

    const client = {
      sandbox:
        "Ab6virnz-batL5zT44Xo1jIZ-bs8Jh9w3gJ_m9Lpt2sQsAcEjHZhqqF0gLFkueNtLXnh4neAUMj9UzLv"
    };

    return (
      <div className={css(styles.container)}>
        {paid ? (
          <div className={css(styles.process)}>
            <img src={notes} width="10%" />
            <br />
            <br />
            <span style={{ fontSize: 22, fontWeight: "bold" }}>
              Payment Completed!
            </span>
            <br />
            <br />
            {moment().format("LLLL")}
          </div>
        ) : (
          <Row>
            <Col span={7}>
              <div className={css(styles.title)}>
                Your visit with Doctor {activeBill.doctor}
              </div>
              on {activeBill.date}
              <br />
              <br />
              <div>
                <Row>
                  <Col span={16}>
                    <b>Total Charge:</b>
                  </Col>
                  <Col span={5}>
                    <div className={css(styles.amount)}>
                      $ {activeBill.amount.toFixed(2)}
                    </div>
                  </Col>
                  <Col span={3} />
                </Row>
                <br />
                <Row>
                  <Col span={16}>
                    <b>Insurance Deductible:</b>
                  </Col>
                  <Col span={5}>
                    <div className={css(styles.amount)}>
                      - ${(activeBill.amount * 0.5).toFixed(2)}
                    </div>
                  </Col>
                  <Col span={3} />
                </Row>
                <hr />
                <Row>
                  <Col span={16}>
                    <b>Total Amount:</b>
                  </Col>
                  <Col span={5}>
                    <div className={css(styles.amount, styles.oop)}>
                      $ {activeBill.oop.toFixed(2)}
                    </div>
                  </Col>
                  <Col span={3} />
                </Row>
              </div>
              <br />
              <br />
              <div className={styles.payMethod}>
                <Button
                  style={{
                    width: "95%",
                    borderRadius: 22,
                    height: 45,
                    fontWeight: "bold"
                  }}
                  type="primary"
                  icon="credit-card"
                  onClick={this.payWithCard}
                >
                  Pay With Card
                </Button>
                <br />
                <br />
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={amount}
                  onError={onError}
                  onSuccess={onSuccess}
                  onCancel={onCancel}
                  style={{ size: "large" }}
                />
              </div>
            </Col>
            <Col span={1} />
            <Col span={16}>
              <div>
                {processing ? (
                  <div className={css(styles.process)}>
                    Payment Processing...
                    <br />
                    <img src={loading} width="40%" />
                  </div>
                ) : (
                  <div>
                    {payWithCard ? (
                      <PaymentForm onSubmit={onSuccess} />
                    ) : (
                      <div className={css(styles.instruction)}>
                        <img src={business} width="27%" />
                        <br />
                        <br />
                        <br />
                        Please Select Your Payment Method on the Left.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Bill;
