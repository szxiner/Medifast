import React from "react";
import _ from "lodash";
import ReactModal from "react-modal";
import { StyleSheet, css } from "aphrodite";
import { Icon, Button, Rate } from "antd";
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
    position: "absolute",
    border: "1px solid",
    borderRadius: 5,
    borderColor: themeColor.grey0,
    padding: 40,
    marginTop: "1%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "1%",
    width: "60%",
    backgroundColor: themeColor.white
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
    const { showModal, handleCloseModal, user } = this.props;
    let lastName;
    let username;
    if (user) {
      username = user.username;
      lastName = user.Last_Name;
    } else {
      lastName = "";
      username = "";
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
          {/* <h3>You are booking an appointment with Dr. {lastName}</h3> */}
          <br />
          <div>
            <MyCalendar username={username} docname={lastName} />
          </div>
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
