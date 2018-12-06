import React from "react";
import axios from "axios";
import _ from "lodash";

import { Bar, Doughnut } from "react-chartjs-2";
import { Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

import loading from "./loading.gif";

const barData = {
  labels: ["Standard", "Gold", "Platinum"],
  datasets: [
    {
      label: "Plan Subscription",
      backgroundColor: "#2191FB",
      borderWidth: 1,
      hoverBackgroundColor: "#1C77CE",
      data: [18, 3, 1]
    }
  ]
};

const styles = StyleSheet.create({
  flexBody: {
    display: "flex",
    justifyContent: "center"
  },
  numberStat: {
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "bold",
    display: "flex",
    flexWrap: "wrap"
  },
  mainStat: {
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 520,
    padding: 12
  },
  insuranceStat: {
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 12,
    height: 520,

    fontSize: 16
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
    margin: "9%",
    fontSize: "22"
  },
  apptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 12
  },
  bookingTotal: {
    fontSize: 24,
    textAlign: "center"
  },
  insuranceTitle: {
    fontSize: 20,
    textAlign: "center"
  },
  welcome: {
    margin: 8,
    borderRadius: 4,
    color: "#fff",
    height: 83.22,
    padding: 20,
    textAlign: "right",
    background: "linear-gradient(to bottom right, #A5FECB, #20BDFF, #5433FF)"
  },
  loading: {
    textAlign: "center",
    fontSize: 16,
    margin: "2%",
    height: "70%",
    width: "90%",
    paddingTop: 50,
    borderRadius: 4,
    backgroundColor: "#fff"
  }
});

export default class InsuranceProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientNum: 0,
      docNum: 0,
      bookings: [],
      bookingNum: 0,
      donutChat: undefined,
      donutChat2: undefined
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
    axios.get("/patient/bill").then(res => {
      const length = res.data.length;
      let paid = 0;
      _.forEach(res.data, book => {
        if (book.bill === "P") {
          paid = paid + 1;
        }
        const data = {
          labels: ["Paid Claims", "Unpaid Claims"],
          datasets: [
            {
              data: [paid, length - paid],
              backgroundColor: ["#E3B505", "#2191FB"],
              hoverBackgroundColor: ["#E3B505", "#2191FB"]
            }
          ]
        };
        this.setState({
          bookingNum: length,
          donutChat2: data
        });
      });
    });
  };

  render() {
    const {
      patientNum,
      docNum,
      bookingNum,
      donutChat,
      donutChat2
    } = this.state;
    return (
      <div className={css(styles.flexBody)}>
        {donutChat && donutChat2 ? (
          <div style={{ width: "100%", paddingLeft: "110px" }}>
            <Row>
              <Col span={6}>
                <div className={css(styles.numberStat)}>
                  <div className={css(styles.numTitle)}>
                    Total number of patients:
                  </div>
                  <div className={css(styles.numberCirclePatient)}>
                    {patientNum}
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={css(styles.numberStat)}>
                  <div className={css(styles.numTitle)}>
                    Total number of doctors:
                  </div>
                  <div className={css(styles.numberCircleDoc)}>{docNum}</div>
                </div>
              </Col>
              <Col span={10}>
                <div className={css(styles.welcome)}>
                  <h1>Welcome back to Medifast!</h1>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={17}>
                <div className={css(styles.mainStat)}>
                  <Row>
                    <Col span={11}>
                      <div>
                        <div className={css(styles.apptTitle)}>
                          Appointments Based on Specialization:
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
                    <Col span={2} />
                    <Col span={11}>
                      <div>
                        <div className={css(styles.apptTitle)}>
                          Claims - Paid and Unpaid:
                          <br />
                        </div>
                        {donutChat2 ? (
                          <div>
                            <Doughnut
                              width={300}
                              height={390}
                              options={{
                                maintainAspectRatio: false
                              }}
                              data={donutChat2}
                            />
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className={css(styles.bookingTotal)}>
                      <br />
                      Total Number of Appointments: <b>{bookingNum}</b>
                      <br />
                    </div>
                  </Row>
                </div>
              </Col>
              <Col span={5}>
                <div className={css(styles.insuranceStat)}>
                  <div className={css(styles.insuranceTitle)}>
                    <br />
                    Total Subscribers: <b>{patientNum}</b>
                    <br />
                    <br />
                  </div>

                  <Row>
                    <Col span={2} />
                    <Col span={10}>Standard: </Col>
                    <Col span={10}>
                      <div style={{ textAlign: "right" }}>16</div>
                    </Col>
                    <Col span={2} />
                  </Row>
                  <br />

                  <Row>
                    <Col span={2} />
                    <Col span={10}>Gold: </Col>
                    <Col span={10}>
                      <div style={{ textAlign: "right" }}>1</div>
                    </Col>
                    <Col span={2} />
                  </Row>
                  <br />

                  <Row>
                    <Col span={2} />
                    <Col span={10}>Platinum: </Col>
                    <Col span={10}>
                      <div style={{ textAlign: "right" }}>1</div>
                    </Col>
                    <Col span={2} />
                  </Row>
                  <br />
                  <hr />
                  <div>
                    <Bar
                      data={barData}
                      width={250}
                      height={250}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className={css(styles.loading)}>
            Loading <br />
            <img src={loading} width="40%" />
          </div>
        )}
      </div>
    );
  }
}
