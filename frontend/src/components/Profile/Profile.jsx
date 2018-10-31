import React from "react";
import _ from "lodash";
import axios from "axios";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";

import InsuranceProfile from "./InsuranceProfile";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";
import PatientProfileForm from "./PatientProfileForm";
import DoctorProfileForm from "./DoctorProfileForm";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: "4%",
    backgroundColor: themeColor.white,
    borderRadius: 8,
    padding: 36
  },
  forms: {
    padding: 16
  },
  error: {
    width: "85%",
    backgroundColor: themeColor.white,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 120,
    paddingBottom: 120,
    fontSize: 24,
    margin: "5%"
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      firstName: "",
      lastName: ""
    };
  }

  componentDidMount = () => {
    const { auth } = this.props;
    const { type, username } = auth.user;
    if (!!username) {
      if (type === "Doctor") {
        axios
          .get(`http://localhost:8000/doctor/profile?username=${username}`)
          .then(res => {
            if (res.status === 200 && res.data.length !== 0) {
              this.setState({ user: res.data[0] });
            }
          });
      } else if (type === "Patient") {
        axios
          .get(`http://localhost:8000/patient/profile?username=${username}`)
          .then(res => {
            console.log(res);
            if (res.status === 200 && res.data.length !== 0) {
              console.log("I am here");
              this.setState({ user: res.data[0] });
            }
          });
      }
    }
  };

  render() {
    const { auth } = this.props;
    const { type } = auth.user;
    const { user } = this.state;
    console.log("type", type);
    console.log("user", user);
    return (
      <div className={css(styles.container)}>
        <div>
          {!!user ? (
            <div>
              {type === "Patient" ? <PatientProfile user={user} /> : <div />}
              {type === "Doctor" ? <DoctorProfile user={user} /> : <div />}
            </div>
          ) : (
            <div className={css(styles.forms)}>
              {type === "Patient" ? <PatientProfileForm /> : <div />}
              {type === "Doctor" ? <DoctorProfileForm /> : <div />}
            </div>
          )}
          {type === "Insurance" ? <InsuranceProfile /> : <div />}
        </div>
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
)(Profile);
