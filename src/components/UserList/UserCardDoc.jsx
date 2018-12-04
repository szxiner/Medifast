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
import ReactModal from "react-modal";
import { Skeleton, Switch, Card, Icon, Avatar, Row, Col } from "antd";
import { themeColor } from "../../theme/colors";
import doc from "./doc.png";
import ant from "./ant.css";
import Map from "../../common/Map";
import Badge from "../../components/Insurance/Badge";
import MyCalendar from "./Calendar";
import axios from "axios";

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
    padding: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
    ":hover": {
      "-webkit-transform": "scale(1.05)",
      " -ms-transform": "scale(1.05)",
      transform: "scale(1.05)"
    }
  },
  flex: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center"
  },
  docname: {
    fontFamily: "font-family: 'Source Sans Pro', sans-serif",
    fontSize: "14px"
  }
});

class UserCardDoc extends React.Component {
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
    this.setState({ appointment: true });
    this.setState({ showModal: true });
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
    const {
      type,
      currentUser,
      activeInfo,
      showModal,
      handleCloseModal,
      showAppt
    } = this.props;
    let activeProfile = currentUser.Last_Name;
    let star;
    let lastName;
    let location;
    let username;
    let insurance;
    let docaddress;
    let city_name;
    let Zip_code;
    //console.log("activeInfooooo", activeInfo[0]);
    if (currentUser) {
      star = currentUser.rating;
      username = currentUser.username;
      lastName = currentUser.Last_Name;
      insurance = currentUser.insurance_name;
      docaddress = currentUser.Address;
      city_name = currentUser.city_name;
      Zip_code = currentUser.Zip_code;

      {
        console.log("insurance", currentUser.insurance_name);
      }
      location = currentUser.location.split(" ");
    } else {
      star = 0;
      lastName = "";
      username = "";
      location = ["12.222", "-86.111"];
    }

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
    const docadrs = docaddress + " " + city_name + " " + Zip_code;
    //showAppt = true;

    if (type === "Doctor")
      return (
        <div className={css(styles.flexBody)}>
          <div className={css(styles.flex)}>
            {console.log(currentUser, "current userrrrr")}

            <div display="inline-block">
              <Card
                style={{
                  width: 500,
                  marginTop: 20,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                }}
              >
                <Meta
                  style={{ height: 500 }}
                  // avatar={
                  //   <Avatar style={{ width: 100, height: 120 }} src={doc} />
                  // }
                  //title={name}
                  description={
                    <div>
                      <Row>
                        <Col span={12}>
                          <Avatar
                            style={{
                              width: 100,
                              height: 120
                            }}
                            src={doc}
                          />
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
                          <Row
                            style={{
                              fontSize: "19px",
                              fontFamily: "font-family: 'Muli', sans-serif  ",
                              color: "#505050"
                            }}
                          >
                            <Rate disabled defaultValue={star} />
                            {/* <Row
                            style={{
                              fontSize: "13px",
                              fontFamily: "font-family: 'Muli', sans-serif  "
                            }}
                          >
                            {address}
                          </Row> */}
                          </Row>
                          <Row style={{ alignItems: "center" }}>
                            <Button
                              type="primary"
                              icon="calendar"
                              size="large"
                              onClick={() => this.handleOpenModal()}
                            >
                              Book an Appointment
                            </Button>
                          </Row>
                        </Col>
                      </Row>
                      <Divider />
                      <Row
                        style={{
                          fontSize: "19px",
                          fontFamily: "font-family: 'Muli', sans-serif  ",
                          color: "#505050",
                          textAlign: "center"
                        }}
                      >
                        {" "}
                        {specialization}
                      </Row>
                      <Row
                        style={{
                          fontSize: "19px",
                          fontFamily: "font-family: 'Muli', sans-serif  ",
                          color: "#505050",
                          textAlign: "center"
                        }}
                      >
                        {address}
                      </Row>
                      {/* <Row
                        style={{
                          fontSize: "22px",
                          fontFamily: "font-family: 'Muli', sans-serif  ",
                          color: "#505050"
                        }}
                      >
                        REVIEW: &nbsp; &nbsp;
                        <Rate disabled defaultValue={star} />
                      </Row> */}
                      <Row
                        style={{
                          fontSize: "19px",
                          fontFamily: "font-family: 'Muli', sans-serif  ",
                          color: "#505050",
                          textAlign: "center"
                        }}
                      >
                        <Badge content={insurance} />
                      </Row>

                      <Divider />
                      <Row>
                        <Col span={15}>
                          <div className={css(styles.map)}>
                            <Map
                              lat={parseFloat(location[0])}
                              lng={parseFloat(location[1])}
                            />
                          </div>
                        </Col>
                        &nbsp;
                        <Col
                          // span={15}
                          style={{
                            fontSize: "19px",
                            fontFamily: "font-family: 'Muli', sans-serif  ",
                            color: "#505050",
                            textAlign: "center"
                          }}
                        >
                          {docadrs}
                        </Col>
                        {/* <Row
                            span={8}
                            style={{
                              fontSize: "19px",
                              fontFamily: "font-family: 'Muli', sans-serif  ",
                              color: "#505050",
                              textAlign: "center"
                              // top: "50%",
                              // left: "50%",
                              // width: "200px",
                              // height: "200px",
                              // margin: "-100px 0 0 -100px"
                            }}
                          >
                          </Row> */}
                      </Row>
                      <DoctorModal
                        showModal={this.state.showModal}
                        handleCloseModal={this.handleCloseModal}
                        // activeInfo={[currentUser]}
                        showAppt={this.props.auth.user.type === "Patient"}
                        user={currentUser}
                      />

                      {/* <ReactModal
                        showModal={this.state.showModal}
                        contentLabel="Doctor Detail"
                        onRequestClose={handleCloseModal}
                        className={css(styles.modal)}
                      >
                        <a
                          onClick={handleCloseModal}
                          className={css(styles.close)}
                        >
                          <Icon type="close" theme="outlined" />
                        </a>
                        <br />
                        <h3>Doctor {lastName}</h3>
                        <br />
                        <div>
                          <a
                            onClick={this.onClick}
                            className={css(styles.left)}
                          >
                            <Icon type="left" theme="outlined" />
                          </a>
                          <MyCalendar username={username} />
                        </div>
                      </ReactModal> */}
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

UserCardDoc.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserCardDoc);
