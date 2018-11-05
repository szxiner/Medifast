import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Icon } from "antd";
import { Grid, Row, Col } from "react-bootstrap";
import DoctorModal from "./DoctorModal";
import PatientModal from "./PatientModal";
import doctor2 from "../../images/doctor2.svg";

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
  }
});

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { type, currentUser } = this.props;

    return (
      <div className={css(styles.container)}>
        <Grid style={{ width: "100%" }}>
          <Row>
            <Col xs={3} md={2}>
              <div>
                {type === "Patient" ? (
                  <Icon
                    type="user"
                    theme="outlined"
                    style={{ fontSize: 66, margin: 10 }}
                  />
                ) : (
                  <div style={{ marginTop: 12 }}>
                    <img src={doctor2} width="60%" />
                  </div>
                )}
              </div>
            </Col>
            <Col xs={11} md={7}>
              <div className={css(styles.info)}>
                {type === "Patient" ? (
                  <div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Name: </span>
                      {currentUser.First_name} {currentUser.Last_Name}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Gender: </span>
                      {currentUser.gender}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Date of Birth:</span>
                      {currentUser.DOB}
                    </div>
                  </div>
                ) : (
                  <div />
                )}
                {type === "Doctor" ? (
                  <div>
                    <div className={css(styles.name)}>
                      Doctor: {currentUser.First_name} {currentUser.Last_Name}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        Specialization:
                      </span>
                      {currentUser.specialization}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Hospital: </span>
                      {currentUser.Hospital}, {currentUser.city_name},
                      {currentUser.state_name}
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </Col>
            <Col xs={4} md={3}>
              {type === "Patient" ? (
                <div>
                  <div className={css(styles.modal)}>
                    <Button
                      shape="circle"
                      icon="plus"
                      onClick={() => this.handleOpenModal()}
                    />
                  </div>
                  <PatientModal
                    showModal={this.state.showModal}
                    handleCloseModal={this.handleCloseModal}
                    activeProfile={currentUser.Last_Name}
                    activeInfo={[currentUser]}
                  />
                </div>
              ) : (
                <div />
              )}
              {type === "Doctor" ? (
                <div>
                  <div className={css(styles.modal)}>
                    <Button
                      shape="circle"
                      icon="plus"
                      onClick={() => this.handleOpenModal()}
                    />
                  </div>
                  <DoctorModal
                    showModal={this.state.showModal}
                    handleCloseModal={this.handleCloseModal}
                    activeInfo={[currentUser]}
                    showAppt={this.props.auth.user.type === "Patient"}
                  />
                </div>
              ) : (
                <div />
              )}
            </Col>
          </Row>
        </Grid>
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
