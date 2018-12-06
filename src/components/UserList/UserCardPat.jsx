import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Rate, Divider } from "antd";
// import { Grid, Row, Col } from "react-bootstrap";
import DoctorModal from "./DoctorModal";
import PatientModal from "./PatientModal";
import doctor2 from "../../images/doctor2.svg";
import userstyles from "./userstyles.css";
import { Navbar, FormGroup, FormControl } from "react-bootstrap";
import { Skeleton, Switch, Card, Icon, Avatar, Row, Col } from "antd";
import { themeColor } from "../../theme/colors";
import doc from "./doc.png";
import ant from "./ant.css";
import { Label } from "react-bootstrap";

const { Meta } = Card;

const styles = StyleSheet.create({
  container: {
    width: "88%",
    backgroundImage: "linear-gradient(right, white 87%, #E9EBEC 13%)",
    borderRadius: 8,
    margin: "2%",
    padding: "1%",
    fontSize: 16,
    lineHeight: 2
  },
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },

  info: {},
  modal: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 4
  },
  name: {
    fontSize: 28,
    paddingRight: 12,
    paddingBottom: 1,
    borderBottom: "1px solid",
    borderColor: "#1890ff"
  },
  flexRow: {
    flexDirection: "row",
    display: "flex"
  },
  flexBody: {
    display: "inline-flex",
    flexWrap: "wrap",
    flexflow: "row wrap",
    //marginRight: "0px",
    justifyContent: "space-around",
    padding: "10px"
  },
  flex: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center"
  },
  "ant-btn": {
    backgroundColor: "transparent",
    borderColor: "#0496FF",
    color: "#0496FF"
  },
  label: {
    fontSize: "smaller"
  },
  planStandard: {
    display: "inline-block",
    fontWeight: "bold",
    background: "-webkit-linear-gradient(#0F4700, #0f9b0f)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    textTransform: "uppercase",
    fontSize: "18px"
  },
  planGold: {
    display: "inline-block",
    fontWeight: "bold",
    background: "-webkit-linear-gradient(#f12711, #f5af19)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    textTransform: "uppercase",
    fontSize: "18px"
  },
  planPlatinum: {
    display: "inline-block",
    fontWeight: "bold",
    background: "-webkit-linear-gradient(#C04848, #480048)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    textTransform: "uppercase",
    fontSize: "18px"
  },
  "ant-avatar-string": {
    position: "relative"
  }
});

class UserCardPat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      appointment: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  onClick = () => {
    this.setState({ appointment: !this.state.appointment });
  };
  handleOpenModal() {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { type, currentUser, activeInfo, currentplan } = this.props;
    let activeProfile = currentUser.Last_Name;
    let star;
    let lastName;
    let location;
    let username;

    const name = currentUser.First_name + "  " + currentUser.Last_Name;
    const specialization = currentUser.specialization;
    const address =
      currentUser.Hospital +
      "  " +
      currentUser.city_name +
      " " +
      currentUser.state_name;
    const gender = currentUser.gender;
    const dob = currentUser.DOB;
    const plan = currentUser.plan;
    {
      console.log("heyyyyyyy I'm  yourrr plaaannnn", plan);
    }
    console.log("heyyy im the current user", currentUser);
    return (
      <div className={css(styles.flexBody)}>
        <div className={css(styles.flex)}>
          <div display="inline-block">
            <Card
              style={{ width: 350, marginTop: 20 }}
              actions={[
                <div>
                  {this.props.auth.user.type === "Doctor" ? (
                    <div style={{ display: "inline-block" }}>
                      <div>
                        <Button
                          shape="circle"
                          icon="plus"
                          className={css(styles["ant-btn"])}
                          onClick={() => this.handleOpenModal()}
                        />
                        <PatientModal
                          showModal={this.state.showModal}
                          handleCloseModal={this.handleCloseModal}
                          activeProfile={currentUser.Last_Name}
                          activeInfo={[currentUser]}
                          className={css(styles.modal)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ]}
            >
              <Meta
                style={{ height: 165 }}
                // avatar={
                //   <Avatar
                //     style={{
                //       fontSize: 48,
                //       backgroundColor: "#00a2ae",
                //       verticalAlign: "middle"
                //     }}
                //     size={100}
                //   >
                //     {name.charAt(0)}
                //   </Avatar>
                // }
                //title={name}
                description={
                  <div>
                    <Row>
                      <Col span={12}>
                        <Avatar
                          style={{
                            position: "relative",
                            fontSize: 48,
                            backgroundColor: "#00a2ae",
                            verticalAlign: "middle"
                          }}
                          className={css(styles["ant-avatar-string"])}
                          size={100}
                        >
                          <div
                            style={{ transform: "scale(1) translateX(-50%)" }}
                          >
                            {name.charAt(0)}
                          </div>
                        </Avatar>
                      </Col>
                      <Col span={12}>
                        <Row
                          style={{
                            fontSize: "26px",
                            fontFamily: "Crimson Text, serif",
                            fontWeight: "500"
                          }}
                        >
                          {name}
                        </Row>
                        <Row>
                          <p
                            style={{
                              display: "inline-block",
                              color: "#000000",
                              fontWeight: "400",
                              fontSize: "20px",
                              fontFamily: "Crimson Text, serif"
                            }}
                          >
                            Plan:
                          </p>
                          &nbsp;
                          <p
                            className={
                              plan === "standard"
                                ? css(styles.planStandard)
                                : plan === "gold"
                                ? css(styles.planGold)
                                : plan === "platinum"
                                ? css(styles.planPlatinum)
                                : ""
                            }
                          >
                            {plan}
                          </p>
                        </Row>
                        <Divider />
                        <Row
                          span={12}
                          style={{
                            fontSize: "16px",
                            fontFamily: "font-family: 'Muli', sans-serif  ",
                            color: "#505050"
                          }}
                        >
                          Gender: {gender}
                        </Row>
                        <Row
                          style={{
                            fontSize: "16px",
                            fontFamily: "font-family: 'Muli', sans-serif  ",
                            color: "#505050"
                          }}
                        >
                          Age: {dob}
                        </Row>
                      </Col>
                    </Row>
                  </div>
                }
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

UserCardPat.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserCardPat);
