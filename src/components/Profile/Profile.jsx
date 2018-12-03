import React from "react";
import _ from "lodash";
import axios from "axios";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import { List } from "react-content-loader";

import InsuranceProfile from "./InsuranceProfile";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";
import PatientProfileForm from "./PatientProfileForm";
import DoctorProfileForm from "./DoctorProfileForm";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: "2%"
    // backgroundImage: "linear-gradient(top, white 97%, #1890ff 3%)",
    // borderRadius: 8,
    // padding: 36
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
      lastName: "",
      loading: true,
      render: false
    };
    this.update = this.update.bind(this);
  }

  update = () => {
    this.setState();
    console.log("UPDATE");
  };

  componentDidMount = () => {
    const { auth } = this.props;
    const { type, username } = auth.user;
    if (type === "Doctor") {
      axios
        .get(`http://localhost:8000/doctor/profile?username=${username} `)
        .then(res => {
          if (res.status === 200 && res.data.length !== 0) {
            this.setState({ user: res.data[0], loading: false });
          } else {
            this.setState({ loading: false });
          }
        })
        .catch(e => {
          this.setState({ loading: false });
        });
    } else if (type === "Patient") {
      axios
        .get(`http://localhost:8000/patient/profile?username=${username}`)
        .then(res => {
          console.log(res);
          if (res.status === 200 && res.data.length !== 0) {
            this.setState({ user: res.data[0], loading: false });
          } else {
            this.setState({ loading: false });
          }
        })
        .catch(e => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  };

  componentWillReceiveProps = () => {
    this.setState({ render: true });
  };

  render() {
    const { auth, render } = this.props;
    const { type } = auth.user;
    const { user } = this.state;
    console.log(type, "type of userrrr");
    console.log(user, "userrrrrrrr");

    return (
      <div className={css(styles.container)}>
        {this.state.loading ? (
          <List />
        ) : (
          <div>
            {!!user ? (
              <div>
                {type === "Patient" ? <PatientProfile user={user} /> : <div />}
                {type === "Doctor" ? <DoctorProfile user={user} /> : <div />}
              </div>
            ) : (
              <div className={css(styles.forms)}>
                {type === "Patient" ? (
                  <PatientProfileForm callBack={this.update()} />
                ) : (
                  <div />
                )}
                {type === "Doctor" ? (
                  <DoctorProfileForm callBack={this.update()} />
                ) : (
                  <div />
                )}
              </div>
            )}
            {type === "Insurance" ? <InsuranceProfile /> : <div />}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  render: state.render
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
