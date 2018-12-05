import React from "react";
import axios from "axios";
import _ from "lodash";

import { Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";

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
    backgroundPosition: "0% 15%",
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

class Insurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllPlans: [],
      Plans: [],
      getplans: false,
      thisplan: false,
      recommendedplan: undefined
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
        company: "Medicare" // take value of users current insurance plan.
      });
      this.setState({ Plans: userplan });
      console.log("so user plans areeee", userplan);
    });

    axios
      .get(`http://127.0.0.1:8000/insRec/recommend/${username}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.insurance_plan);
          this.setState({ recommendplan: res.data.insurance_plan });

          console.log("recommend plan isss", this.state.recommend);
          console.log("Im connected");
        } else {
          console.log(" No Recommendations");
        }
      });
  }

  render() {
    const { auth, currentUser, username } = this.props;
    {
      console.log("All Plasssss", this.state.AllPlans);
    }
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
              <InsurancePlans
                plans={_.filter(this.state.AllPlans, { company: "Medicare" })}
                recommended={this.state.recommendedplan}
              />
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Insurance);
