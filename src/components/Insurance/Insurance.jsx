import React from "react";
import axios from "axios";
import _ from "lodash";

import { Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

import InsurancePlans from "./InsurancePlans";
import InsuranceProvider from "./InsuranceProvider";

const styles = StyleSheet.create({
  container: {
    width: "94%",
    margin: "2%",
    display: "flex"
  },
  insuranceProvider: {
    flex: 1,
    marginLeft: "1%",
    padding: "5%",
    borderRadius: 8,
    backgroundColor: "white"
  },
  insurancePlan: {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1518242231892-d9404d5af8a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b022bbb5c2cc17e29d56b5b4e779993&auto=format&fit=crop&w=2686&q=80')",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "top",
    backgroundSize: "100% 35%",
    flex: 1,
    marginRight: "1%",
    padding: "4%",
    borderRadius: 8,
    backgroundColor: "white"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textShadow: "2px 2px 8px #000"
  },
  subTitle: {
    textShadow: "2px 2px 8px #000"
  },
  header: {
    textAlign: "center",
    color: "#fff",
    marginTop: "5%",
    marginBottom: "5%"
  }
});
export default class Insurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className={css(styles.container)}>
        <Row style={{ width: "100%" }}>
          <Col span={16}>
            <div className={css(styles.insurancePlan)}>
              <div className={css(styles.header)}>
                <div className={css(styles.title)}>Plan Options</div>
                <div className={css(styles.subTitle)}>
                  You can upgrade or downgrade at any time.
                </div>
              </div>
              <InsurancePlans />
            </div>
          </Col>
          <Col span={8}>
            <div className={css(styles.insuranceProvider)}>
              <InsuranceProvider />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
