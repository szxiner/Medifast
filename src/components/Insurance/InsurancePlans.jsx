import React from "react";
import _ from "lodash";

import { Button, Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";
import axios from "axios";

import Badge from "./Badge";
import { connect } from "react-redux";

const dummyPrice = ["32.99", "55.99", "99.99"];
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
    padding: "2% 2%",
    textAlign: "center",
    marginTop: "2%",
    ":hover": {
      "-webkit-transform": "scale(1.05)",
      " -ms-transform": "scale(1.05)",
      transform: "scale(1.05)"
    }
  },
  recommendPlan: {},
  planName: {
    fontSize: 18,
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
      thisplan: false,
      select: false
    };
  }

  componentDidMount() {}

  onClick = () => {
    console.log("clicked");
    this.setState({ select: true });
  };

  render() {
    const { userType, currentUser, plans } = this.props;
    let username;
    if (currentUser) {
      username = currentUser.username;
    } else {
      username = undefined;
    }
    return (
      <div className={css(styles.container)}>
        {_.map(this.props.plans, (plan, index) => {
          console.log(plan, "plan");
          return (
            <div className={css(styles.plan)}>
              <Row style={{ height: "100%" }}>
                <Col span={6}>
                  <div className={css(styles.planName)}>
                    <b>{plan.plan}</b>
                  </div>
                  <div className={css(styles.price)}>
                    <span style={{ fontSize: 12 }}>$</span>
                    {dummyPrice[index]}
                  </div>
                  per month
                  <br />
                  {plan.plan === "GOLD" ? (
                    <Badge content="recommended" />
                  ) : (
                    <div />
                  )}
                </Col>
                <Col span={12}>
                  <div className={css(styles.infos)}>
                    <div>
                      • Access to Network <br />
                      • Make Appointments for free <br />• Cover{" "}
                      <b>{plan.coverage}%</b> of your expense <br />
                    </div>
                  </div>
                </Col>
                <Col span={6} style={{ height: "100%" }}>
                  {plan.plan === "standard" && !this.state.select ? (
                    <Button
                      style={{ borderRadius: 12 }}
                      type="primary"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <div>
                      {plan.plan === "GOLD" && this.state.select ? (
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
                          onClick={this.onClick.bind(this)}
                        >
                          Select Plan
                        </Button>
                      )}
                    </div>
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
