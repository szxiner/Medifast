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

  componentDidMount() {
    const { auth } = this.props;
    const { username } = auth.user;

    console.log("am i mounting?");
    console.log("is this a userrr", username);
    axios.get("http://127.0.0.1:8000/insRec/details").then(res => {
      //const list = _.filter(res.data, { company: "Medifast" });
      this.setState({
        AllPlans: res.data
      });
      this.setState({ getplans: true });

      console.log("All Plans", this.state.AllPlans);
      console.log("state of get plans", this.state.getplans);

      const userplan = _.filter(this.state.AllPlans, {
        company: "Medicare"
      });
      this.setState({ Plans: userplan });
      console.log("so user plans areeee", userplan);
      // if (list.length !== 0) {
      //   this.setState({
      //     Plans: res.data
      //   });
      //   console.log("Imgetting plans");
      //   this.setState({ getplans: true });
      // }
    });

    axios
      .get(`http://127.0.0.1:8000/insRec/recommend?username=${username}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          this.setState({ recommend: res.data });
          this.setState({ recommended: true });
          // const recommendedPlan = _.filter(recommend, {
          //   search: user.search
          // });

          console.log("recommend", this.state.recommend);
          console.log("Im connected");
        } else {
          console.log(" No Recommendations");
        }
        if (this.state.recommended) {
          for (let i = 0; i < recommend.length; i++) {
            if (
              this.state.userplan.plan === this.state.recommend.insurance_plan
            ) {
              this.setState({ recommended: true });
              this.state.userplan.push(this.state.recommend.insurance_plan);
              this.setState(
                (this.state.userplan.company = recommend.insurance_plan)
              );
            } else {
              this.setState({ recommended: false });
            }
          }
        }
        console.log(this.state.userplan.company, "updated user plannnn");
      });
  }

  render() {
    const { userType, currentUser } = this.props;

    let username;
    if (currentUser) {
      username = currentUser.username;
    } else {
      username = undefined;
    }
    return (
      <div className={css(styles.container)}>
        {_.map(dummyPlans, plan => {
          return (
            <div className={css(styles.plan)}>
              <Row style={{ height: "100%" }}>
                <Col span={6}>
                  <div className={css(styles.planName)}>
                    {/* {this.state.userplan.company} */}
                  </div>
                  <div className={css(styles.planName)}>
                    {/* {this.state.userplan.plan} */}
                  </div>
                  <div className={css(styles.price)}>
                    <span style={{ fontSize: 12 }}>$</span>
                    {plan.price}
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
