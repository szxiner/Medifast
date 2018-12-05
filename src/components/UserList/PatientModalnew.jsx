import React from "react";
import _ from "lodash";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { Icon } from "antd";
import { themeColor } from "../../theme/colors";
import { Button, Tooltip, Icon, Row, Col } from "antd";

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
      <ReactModal
        isOpen={showModal}
        contentLabel="Patient Detail"
        onRequestClose={handleCloseModal}
        className={css(styles.modal)}
      >
        <a onClick={handleCloseModal} className={css(styles.close)}>
          <Icon type="close" theme="outlined" />
        </a>

        {_.map(activeInfo, info => {
          return (
            <div
              className={
                !this.isOdd(id)
                  ? css(styles.container, styles.containerOdd)
                  : css(styles.container, styles.containerEven)
              }
            >
              <Row style={{ height: "100%" }}>
                <Col span={4} style={{ height: "100%" }}>
                  <b>{info.issue}</b>
                </Col>
                <Col span={8}>
                  <div className={css(styles.doctor)}>
                    <div className={css(styles.doctorInit)}>{info.date}</div>
                    <div className={css(styles.doctorName)}>{info.doctor}</div>
                  </div>
                </Col>
              </Row>
            </div>
          );
          //   :(
          // <div>
          //     <h3>Patient {activeProfile}</h3>
          //     <div className={css(styles.error)}>
          //       <Icon type="book" theme="outlined" />
          //       <span style={{ marginLeft: 15 }}>
          //         Medical history not available.
          //       </span>
          //     </div>
          //   </div>
          //   )
        })}
      </ReactModal>
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
