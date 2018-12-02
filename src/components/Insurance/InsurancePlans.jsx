import React from "react";
import _ from "lodash";

import { Button, Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

import Badge from "./Badge";

const dummyPlans = [
  {
    name: "Standard",
    price: "32.99",
    recommended: false,
    currentPlan: true,
    info: [
      { content: "Access to Network", help: "" },
      { content: "$2500 Deductible", help: "" },
      { content: "Full price primary care", help: "" },
      { content: "Full price specialists", help: "" }
    ]
  },
  {
    name: "Gold",
    price: "55.99",
    recommended: true,
    currentPlan: false,
    info: [
      { content: "Access to Network", help: "" },
      { content: "$1500 Deductible", help: "" },
      { content: "$40 Primary care before deductible", help: "" },
      { content: "$80 Specialists before deductible", help: "" }
    ]
  },
  {
    name: "Platinum",
    price: "99.99",
    recommended: false,
    currentPlan: false,
    info: [
      { content: "Access to Network", help: "" },
      { content: "$1500 Deductible", help: "" },
      { content: "$15 Primary care before deductible", help: "" },
      { content: "$80 Specialists before deductible", help: "" }
    ]
  }
];

const styles = StyleSheet.create({
  plan: {
    transition: "all 0.3s ease",
    position: "relative",
    border: "1px solid",
    borderColor: "#C3C3C3",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "4% 2%",
    textAlign: "center",
    marginTop: "5%",
    ":hover": {
      "-webkit-transform": "scale(1.05)",
      " -ms-transform": "scale(1.05)",
      transform: "scale(1.05)"
    }
  },
  recommendPlan: {},
  planName: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  price: {
    paddingTop: 12,
    fontSize: 28,
    fontWeight: "bold"
  },
  infos: {
    position: "absolute",
    top: "50%",
    paddingLeft: "10%",
    textAlign: "left"
  }
});
export default class InsurancePlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className={css(styles.container)}>
        {_.map(dummyPlans, plan => {
          return (
            <div className={css(styles.plan)}>
              <Row style={{ height: "100%" }}>
                <Col span={6}>
                  <div className={css(styles.planName)}>{plan.name}</div>
                  <div className={css(styles.price)}>
                    <span style={{ fontSize: 12 }}>$</span>
                    {plan.price}
                  </div>
                  per month
                  <br />
                  {plan.recommended ? <Badge content="recommended" /> : <br />}
                </Col>
                <Col span={12}>
                  <div className={css(styles.infos)}>
                    {_.map(plan.info, i => {
                      return (
                        <div>
                          • {i.content}
                          <br />
                        </div>
                      );
                    })}
                  </div>
                </Col>
                <Col span={6} style={{ height: "100%" }}>
                  {plan.currentPlan ? (
                    <Button
                      style={{ borderRadius: 12 }}
                      type="primary"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      style={{
                        borderRadius: 12
                      }}
                      type="primary"
                    >
                      Select Plan
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  }
}
