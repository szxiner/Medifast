import React from "react";
import axios from "axios";
import _ from "lodash";

import { Doughnut } from "react-chartjs-2";
import { Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  insuranceContainer: {},
  numberStat: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "bold",
    display: "flex",
    flexWrap: "wrap"
  },
  mainStat: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 500,
    padding: 12
  },
  insuranceStat: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 4
  },
  numberCirclePatient: {
    borderRadius: "50%",
    width: 66,
    height: 66,
    padding: 8,
    margin: "2%",
    border: "7px solid #FFA400",
    background: "#fff",
    color: "#000",
    textAlign: "center",
    font: "32px Arial, sans-serif"
  },
  numberCircleDoc: {
    borderRadius: "50%",
    width: 66,
    height: 66,
    padding: 8,
    margin: "2%",
    border: "7px solid #317EBE",
    background: "#fff",
    color: "#000",
    textAlign: "center",
    font: "32px Arial, sans-serif"
  },
  numTitle: {
    margin: "9%"
  },
  apptTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 12
  }
});

export default class InsuranceProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientNum: 0,
      docNum: 0,
      bookings: [],
      donutChat: undefined
    };
  }

  generateHashMap = (bookings, doctors) => {
    console.log("generateHashMap");
    console.log(bookings);
    console.log(doctors);
    let map = new Object();
    _.forEach(bookings, booking => {
      const docName = booking.docusername;
      const doc = _.find(doctors, { username: docName });
      if (doc) {
        const sp = doc.specialization;
        console.log("sp", sp);
        if (map[sp]) {
          map[sp] = map[sp] + 1;
        } else {
          map[sp] = 1;
        }
        return;
      } else {
        return;
      }
    });
    return map;
  };

  componentDidMount = () => {
    axios.get(`/patient/profile`).then(res => {
      this.setState({ patientNum: res.data.length });
    });
    axios.get(`/doctor/profile`).then(res => {
      this.setState({ docNum: res.data.length });
    });
    axios.get(`/doctor/bookings`).then(res => {
      this.setState({ bookings: res.data }, () => {
        axios.get(`/doctor/profile`).then(res => {
          const map = this.generateHashMap(this.state.bookings, res.data);
          let sp = [];
          let count = [];
          _.forEach(map, (key, value) => {
            sp = [...sp, key];
            count = [...count, value];
          });
          console.log(count);
          const data = {
            labels: count,
            datasets: [
              {
                data: sp,
                backgroundColor: [
                  "#EF3E36",
                  "#E3B505",
                  "#2191FB",
                  "#19535F",
                  "#6B9080",
                  "#BDC0C9"
                ],
                hoverBackgroundColor: [
                  "#EF3E36",
                  "#E3B505",
                  "#2191FB",
                  "#19535F",
                  "#6B9080",
                  "#BDC0C9"
                ]
              }
            ]
          };
          this.setState({
            donutChat: data
          });
        });
      });
    });
  };

  render() {
    const { patientNum, docNum, donutChat } = this.state;
    return (
      <div className={css(styles.insuranceContainer)}>
        <Row>
          <Col span={6}>
            <div className={css(styles.numberStat)}>
              <div className={css(styles.numTitle)}>Patient Numbers:</div>
              <div className={css(styles.numberCirclePatient)}>
                {patientNum}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={css(styles.numberStat)}>
              <div className={css(styles.numTitle)}>Doctor Numbers:</div>
              <div className={css(styles.numberCircleDoc)}>{docNum}</div>
            </div>
          </Col>
          <Col span={12}>{/* <h1>Welcome back to Medifast!</h1> */}</Col>
        </Row>
        <Row>
          <Col span={18}>
            <div className={css(styles.mainStat)}>
              <Row>
                <Col span={12}>
                  <div>
                    <div className={css(styles.apptTitle)}>
                      Appointments - Specialization by Counts:
                      <br />
                    </div>
                    {donutChat ? (
                      <div>
                        <Doughnut
                          width={300}
                          height={390}
                          options={{
                            maintainAspectRatio: false
                          }}
                          data={donutChat}
                        />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </Col>
                <Col span={12}>Claim Number</Col>
              </Row>
            </div>
          </Col>
          <Col span={5}>
            <div className={css(styles.insuranceStat)}>Insurance Plan</div>
          </Col>
        </Row>
      </div>
    );
  }
}
