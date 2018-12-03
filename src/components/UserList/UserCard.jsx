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
  }
});

class UserCard extends React.Component {
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
    const { type, currentUser, activeInfo } = this.props;
    let activeProfile = currentUser.Last_Name;
    let star;
    let lastName;
    let location;
    let username;
    let insurance;

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
    //Patient viewwww
    // if (type === "Patient")
    //   return (
    //     <div className={css(styles.flexBody)}>
    //       <div className={css(styles.flex)}>
    //         <div display="inline-block">
    //           <Card
    //             style={{ width: 350, marginTop: 20 }}
    //             actions={[
    //               <div style={{ display: "inline-block" }}>
    //                 <Button
    //                   shape="circle"
    //                   icon="plus"
    //                   onClick={() => this.handleOpenModal()}
    //                 />
    //                 <PatientModal
    //                   showModal={this.state.showModal}
    //                   handleCloseModal={this.handleCloseModal}
    //                   activeProfile={currentUser.Last_Name}
    //                   activeInfo={[currentUser]}
    //                   className={css(styles.modal)}
    //                 />
    //               </div>
    //             ]}
    //           >
    //             <Meta
    //               style={{ height: 400 }}
    //               // avatar={
    //               //   <Avatar style={{ width: 100, height: 120 }} src={doc} />
    //               // }
    //               //title={name}
    //               description={
    //                 <div>
    //                   <Row>
    //                     <Col span={12}>
    //                       <Avatar
    //                         style={{ width: 100, height: 120 }}
    //                         src={doc}
    //                       />
    //                     </Col>
    //                     <Col span={12}>{name}</Col>
    //                   </Row>
    //                   <br />
    //                   <Row>Gender: {gender}</Row>
    //                   <Row>Date of Birth: {dob}</Row>
    //                 </div>
    //               }
    //             />
    //           </Card>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // if (type === "Doctor")
    //   return (
    //     <div className={css(styles.flexBody)}>
    //       <div className={css(styles.flex)}>
    //         {console.log(currentUser, "current userrrrr")}

    //         <div display="inline-block">
    //           <Card
    //             style={{ width: 350, height: 1000, marginTop: 20 }}
    //             actions={[
    //               <div style={{ display: "inline-block" }}>
    //                 <Button
    //                   shape="circle"
    //                   icon="plus"
    //                   onClick={() => this.handleOpenModal()}
    //                 />
    //                 <DoctorModal
    //                   showModal={this.state.showModal}
    //                   handleCloseModal={this.handleCloseModal}
    //                   activeProfile={currentUser.Last_Name}
    //                   activeInfo={[currentUser]}
    //                   className={css(styles.modal)}
    //                 />
    //               </div>
    //             ]}
    //           >
    //             <Meta
    //               style={{ height: 400 }}
    //               // avatar={
    //               //   <Avatar style={{ width: 100, height: 120 }} src={doc} />
    //               // }
    //               //title={name}
    //               description={
    //                 <div>
    //                   <Row>
    //                     <Col span={12}>
    //                       <Avatar
    //                         style={{ width: 100, height: 120 }}
    //                         src={doc}
    //                       />
    //                     </Col>
    //                     <Col span={12}>{name}</Col>
    //                   </Row>
    //                   <br />
    //                   <Row> Specialization: {specialization}</Row>
    //                   <Row>Hospital: {address}</Row>
    //                   <Row>
    //                     REVIEW: &nbsp; &nbsp;
    //                     <Rate disabled defaultValue={star} />
    //                     <br />
    //                   </Row>
    //                 </div>
    //               }
    //             />
    //           </Card>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // if (type === "provider")
    return (
<<<<<<< HEAD
      //patient view
      <div>
        <div className={css(styles.flexBody)}>
          <div className={css(styles.flex)}>
            {console.log(currentUser, "current userrrrr")}

            <div display="inline-block">
              <Card
                style={{ width: 350, height: 1000, marginTop: 20 }}
                actions={[
                  <div style={{ display: "inline-block" }}>
                    <Button
                      shape="circle"
                      icon="plus"
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
                ]}
              >
                <Meta
                  style={{ height: 900 }}
                  avatar={
                    <Avatar style={{ width: 100, height: 120 }} src={doc} />
                  }
                  title={name}
                  description={
                    <div>
                      <span style={{ fontWeight: "bold" }}>Gender: </span>
                      {gender}
                      <span style={{ fontWeight: "bold" }}>Date of Birth:</span>
                      {dob}
                    </div>
                  }
                  // <span style={{ fontWeight: "bold" }}>Hospital: </span>+
                  // {address}
                />
              </Card>
            </div>
          </div>
        </div>
        //doctor view
        <div className={css(styles.flexBody)}>
          <div className={css(styles.flex)}>
            {console.log(currentUser, "current userrrrr")}

            <div display="inline-block">
              <Card
                style={{ width: 350, height: 1000, marginTop: 20 }}
                actions={[
                  <div style={{ display: "inline-block" }}>
                    <Button
                      shape="circle"
                      icon="plus"
                      onClick={() => this.handleOpenModal()}
                    />
                    <DoctorModal
                      showModal={this.state.showModal}
                      handleCloseModal={this.handleCloseModal}
                      activeProfile={currentUser.Last_Name}
                      activeInfo={[currentUser]}
                      className={css(styles.modal)}
                    />
=======
      <div className={css(styles.flexBody)}>
        <div className={css(styles.flex)}>
          <div display="inline-block">
            <Card
              style={{ width: 350, height: 1000, marginTop: 20 }}
              actions={[
                <div style={{ display: "inline-block" }}>
                  <Button
                    shape="circle"
                    icon="plus"
                    onClick={() => this.handleOpenModal()}
                  />
                  {/* <DoctorModal
                    showModal={this.state.showModal}
                    handleCloseModal={this.handleCloseModal}
                    activeProfile={currentUser.Last_Name}
                    activeInfo={[currentUser]}
                    className={css(styles.modal)}
                  /> */}
                </div>
              ]}
            >
              <Meta
                style={{ height: 900 }}
                avatar={
                  <Avatar style={{ width: 100, height: 120 }} src={doc} />
                }
                title={name}
                description={
                  <div>
                    <span
                      style={{ fontWeight: "bold", display: "inline-block" }}
                    >
                      Specialization:
                    </span>
                    <span> {specialization} </span>
                    <br />
                    <span style={{ fontWeight: "bold" }}>Hospital: </span>
                    {address}
>>>>>>> 95c5bb876e9751ab71d605602a5d125c50d9a2e5
                  </div>
                ]}
              >
                <Meta
                  style={{ height: 900 }}
                  avatar={
                    <Avatar style={{ width: 100, height: 120 }} src={doc} />
                  }
                  title={name}
                  description={
                    <div>
                      <span
                        style={{
                          fontWeight: "bold",
                          display: "inline-block"
                        }}
                      >
                        Specialization:
                      </span>
                      <span> {specialization} </span>
                      <br />
                      <span style={{ fontWeight: "bold" }}>Hospital: </span>
                      {address}
                    </div>
                  }
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserCard);
