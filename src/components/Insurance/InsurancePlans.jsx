import React from "react";
import _ from "lodash";

import { Button, Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

import Badge from "./Badge";

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
        {_.map(this.props.plans, plan => {
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
                  {this.props.recommended === plan.name ? (
                    <Badge content="recommended" />
                  ) : (
                    <br />
                  )}
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
