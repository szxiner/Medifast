import React from "react";
import _ from "lodash";

import { Button, Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";
import axios from "axios";

import Badge from "./Badge";
import { connect } from "react-redux";

const dummyPlans = [
  {
    name: "Standard",
    price: "32.99",
    //recommended: false,
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
const recommend = false;
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
class InsurancePlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllPlans: [],
      Plans: [],
      recommend: [],
      getplans: false,
      thisplan: false
    };
  }

  componentDidMount() {}

  render() {
    const { userType, currentUser, plans } = this.props;
    {
      console.log(plans, "this si plans");
    }
    let username;
    if (currentUser) {
      username = currentUser.username;
    } else {
      username = undefined;
    }
    return (
      <div className={css(styles.container)}>
        {_.map(this.props.plans, plan => {
          return (
            <div className={css(styles.plan)}>
              <Row style={{ height: "100%" }}>
                <Col span={6}>
                  <div className={css(styles.planName)}>{plans.company}</div>
                  <div className={css(styles.planName)}>{plans.plan}</div>
                  <div className={css(styles.price)}>
                    <span style={{ fontSize: 12 }}>$</span>
                    {plans.price}
                  </div>
                  per month
                  <br />
                  {recommend ? <Badge content="recommended" /> : <br />}
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(InsurancePlans);
