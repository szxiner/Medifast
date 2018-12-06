import React from "react";
import _ from "lodash";
import ReactModal from "react-modal";
import { StyleSheet, css } from "aphrodite";
import { Icon, Button, Rate } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Map1 from "../../common/Map1";
import { themeColor } from "../../theme/colors";
import MyCalendar from "./Calendar";

const styles = StyleSheet.create({
  table: {
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.dark0,
    width: "100%",
    color: themeColor.dark1,
    background: themeColor.snow0
  },
  tr: {
    fontWeight: "normal",
    padding: 4,
    borderBottom: "1px solid",
    borderColor: themeColor.grey0
  },
  th: {
    padding: 4,
    fontWeight: "normal"
  },
  modal: {
    position: "absolute",
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.grey0,
    padding: 40,
    marginTop: "1%",
    marginLeft: "30%",
    marginRight: "20%",
    marginBottom: "1%",
    width: "40%",
    backgroundColor: themeColor.white,
    display: "center"
  },
  close: {
    right: 25,
    top: 25,
    position: "absolute"
  },
  left: {
    left: 25,
    top: 25,
    position: "absolute"
  }
});
class DoctorModal_Appt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: false
    };
  }

  onClick = () => {
    this.setState({ appointment: !this.state.appointment });
  };

  render() {
    const { showModal, handleCloseModal, activeInfo, showAppt } = this.props;

    let star;
    let lastName;
    let location;
    let username;
    let insurance;

    if (activeInfo[0]) {
      star = activeInfo[0].rating;
      username = activeInfo[0].username;
      lastName = activeInfo[0].Last_Name;
      insurance = activeInfo[0].insurance_name;
      location = activeInfo[0].location.split(" ");
    } else {
      star = 0;
      lastName = "";
      username = "";
      location = ["12.222", "-86.111"];
    }

    return (
      <div style={{ alignItems: "center" }}>
        <ReactModal
          isOpen={showModal}
          contentLabel="Doctor Detail"
          onRequestClose={handleCloseModal}
          className={css(styles.modal)}
        >
          <a onClick={handleCloseModal} className={css(styles.close)}>
            <Icon type="close" theme="outlined" />
          </a>
          <br />
          <h3>Doctor {lastName}</h3>
          <br />
          {this.state.appointment ? (
            <div>
              <a onClick={this.onClick} className={css(styles.left)}>
                <Icon type="left" theme="outlined" />
              </a>
              <MyCalendar username={username} />
            </div>
          ) : (
            <div>
              <div>
                REVIEW: &nbsp; &nbsp;
                <Rate disabled defaultValue={star} />
                <br />
              </div>
              <div>Insurance Company: {insurance}</div>
              <br />
              <div className={css(styles.map)}>
                <Map1
                  lat={parseFloat(location[0])}
                  lng={parseFloat(location[1])}
                />
              </div>
              <br />
              {showAppt && this.props.auth.user.type === "Patient" ? ( //button is being displayed after removing "showAppt &&" part from the condition
                <Button
                  type="primary"
                  icon="calendar"
                  size="large"
                  onClick={this.onClick}
                >
                  Book an Appointment
                </Button>
              ) : (
                <div />
              )}
            </div>
          )}
        </ReactModal>
      </div>
    );
  }
}

DoctorModal_Appt.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(DoctorModal_Appt);
