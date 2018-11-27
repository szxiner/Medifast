import React from "react";
import _ from "lodash";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { Icon } from "antd";
import { themeColor } from "../../theme/colors";

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
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    width: "60%",
    height: 450
  },
  close: {
    right: 25,
    top: 25,
    position: "absolute"
  },
  error: {
    width: "85%",
    backgroundColor: themeColor.white,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 120,
    paddingBottom: 120,
    fontSize: 28,
    margin: "5%"
  }
});

class PatientModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showModal,
      handleCloseModal,
      activeProfile,
      activeInfo,
      auth
    } = this.props;

    const { type } = auth.user;

    return (
      <div>
        <ReactModal
          isOpen={showModal}
          contentLabel="Patient Detail"
          onRequestClose={handleCloseModal}
          className={css(styles.modal)}
        >
          <a onClick={handleCloseModal} className={css(styles.close)}>
            <Icon type="close" theme="outlined" />
          </a>
          {type === "Doctor" ? (
            <div>
              <h3>Medical History for {activeProfile}</h3>
              <br />
              <table className={css(styles.table)}>
                <tr className={css(styles.tr)}>
                  <th className={css(styles.th)}>Issue</th>
                  <th className={css(styles.th)}>Date</th>
                  <th className={css(styles.th)}>Doctor</th>
                </tr>
                {_.map(activeInfo, info => {
                  return (
                    <tr className={css(styles.tr)}>
                      <th className={css(styles.th)}>{info.issue}</th>
                      <th className={css(styles.th)}>{info.date}</th>
                      <th className={css(styles.th)}>{info.doctor}</th>
                    </tr>
                  );
                })}
              </table>
            </div>
          ) : (
            <div>
              <h3>Patient {activeProfile}</h3>
              <div className={css(styles.error)}>
                <Icon type="book" theme="outlined" />
                <span style={{ marginLeft: 15 }}>
                  Medical history not available.
                </span>
              </div>
            </div>
          )}
        </ReactModal>
      </div>
    );
  }
}

PatientModal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PatientModal);
