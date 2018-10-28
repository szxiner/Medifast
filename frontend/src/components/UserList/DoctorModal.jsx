import React from "react";
import _ from "lodash";
import ReactModal from "react-modal";
import { StyleSheet, css } from "aphrodite";
import { Icon, Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Map from "../../common/Map";
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
    backgroundColor: themeColor.white,
    position: "absolute",
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.grey0,
    padding: 40,
    marginTop: "1%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "1%",
    width: "60%"
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
class DoctorModal extends React.Component {
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

    if (activeInfo[0]) {
      star = activeInfo[0].rating;
      username = activeInfo[0].username;
      lastName = activeInfo[0].Last_Name;
      location = activeInfo[0].location.split(" ");
    } else {
      star = 0;
      lastName = "";
      username = "";
      location = ["12.222", "-86.111"];
    }

    return (
      <div>
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
                {_.times(star, () => {
                  return <Icon type="star" theme="filled" />;
                })}
                <br />
              </div>
              <br />
              <div className={css(styles.map)}>
                <Map
                  lat={parseFloat(location[0])}
                  lng={parseFloat(location[1])}
                />
              </div>
              <br />
              {showAppt && this.props.auth.type === "Insurance" ? (
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

DoctorModal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(DoctorModal);
