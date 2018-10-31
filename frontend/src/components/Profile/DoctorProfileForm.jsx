import React from "react";
import _ from "lodash";
import axios from "axios";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from "../../common/Button";
import WorkTimeForm from "./WorkTimeForm";

const styles = StyleSheet.create({
  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  welcome: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 40
  }
});

class DoctorProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      specialization: "",
      hospital: "",
      address: "",
      location: "",
      charge: null,
      stageTwo: false,
      city: "",
      state: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  postDoctor = () => {
    const { auth } = this.props;
    const { username } = auth.user;
    const {
      firstName,
      lastName,
      specialization,
      hospital,
      charge,
      location,
      city,
      state
    } = this.state;
    const doctor = {
      username: username,
      email: "someEmail@gmail.com",
      First_name: firstName,
      Last_Name: lastName,
      gender: "Other",
      DOB: "1980-01-01",
      specialization: specialization,
      Hospital: hospital,
      rating: 0,
      hourly_charge: parseInt(charge, 10),
      location: location,
      city: city,
      state: state
    };
    axios
      .post("http://127.0.0.1:8000/doctor/profile", doctor)
      .then(res => {
        if (res.status === 201) {
          this.setState({ errorMsg: "Profile updated!", stageTwo: true });
        }
      })
      .catch(() => {
        this.setState({
          errorMsg: "An error occurs. Please try again later"
        });
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.state.address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const locationString =
          results[0].geometry.location.lat().toString() +
          ", " +
          results[0].geometry.location.lng().toString();
        this.setState({ location: locationString }, () => {
          this.postDoctor();
        });
      }
    });
  };

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <h1>Welcome to Medifast!</h1>
        <div className={css(styles.welcome)}>
          To get full service of our digital platform, please tell us a bit more
          about yourself!
        </div>
        <br />
        {!this.state.stageTwo ? (
          <div>
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                <ControlLabel>First Name:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="text"
                  name="firstName"
                  label="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                <br />
                <ControlLabel>Last Name:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="text"
                  name="lastName"
                  label="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                <br />
                <ControlLabel>Specialization:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="text"
                  name="specialization"
                  label="specialization"
                  value={this.state.specialization}
                  onChange={this.onChange}
                />
                <br />
                <ControlLabel>Hospital/Clinic:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="text"
                  name="hospital"
                  label="hospital"
                  value={this.state.hospital}
                  onChange={this.onChange}
                />
                <br />
                <ControlLabel>Address:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="text"
                  name="address"
                  label="address"
                  value={this.state.address}
                  onChange={this.onChange}
                />
                <br />
                <ControlLabel>City:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="text"
                  name="city"
                  label="address"
                  value={this.state.city}
                  onChange={this.onChange}
                />
                <br />
                <ControlLabel>State:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="text"
                  name="state"
                  label="address"
                  value={this.state.state}
                  onChange={this.onChange}
                />
                <br />
                <ControlLabel>Approximate Charge / hr:</ControlLabel>
                <FormControl
                  className={css(styles.inputBox)}
                  type="number"
                  name="charge"
                  label="charge"
                  value={this.state.charge}
                  onChange={this.onChange}
                />
                <br />
                <Button name="Submit" type="submit" />
              </FormGroup>
            </form>
            <div className={css(styles.error1)}>{this.state.errorMsg}</div>
          </div>
        ) : (
          <WorkTimeForm />
        )}
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
)(DoctorProfileForm);
