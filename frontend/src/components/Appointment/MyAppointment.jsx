import React from "react";
import _ from "lodash";
import axios from "axios";
import { Icon } from "antd";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import AppointmentCard from "./AppointmentCard";

const styles = StyleSheet.create({
  container: {
    width: "100%"
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

class MyAppointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myAppts: []
    };
  }

  componentDidMount = () => {
    const { auth } = this.props;
    const { type, username } = auth.user;
    axios.get("http://localhost:8000/doctor/bookings").then(res => {
      let list = [];
      if (type === "Doctor") {
        list = _.filter(res.data, { docusername: username });
      } else if (type === "Patient") {
        list = _.filter(res.data, { patientusername: username });
      }
      this.setState({ myAppts: list });
    });
  };

  render() {
    const { auth } = this.props;
    const { myAppts } = this.state;
    return (
      <div className={css(styles.container)}>
        {myAppts.length === 0 ? (
          <div className={css(styles.error)}>
            <Icon type="book" theme="outlined" />
            <span style={{ marginLeft: 15 }}>
              No available appointment found.
            </span>
          </div>
        ) : (
          <div />
        )}
        {_.map(myAppts, (apt, key) => {
          return <AppointmentCard appointment={apt} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(MyAppointment);
