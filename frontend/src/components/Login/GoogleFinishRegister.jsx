import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { storeUser } from "../../actions/authActions";
import { themeColor } from "../../theme/colors";
import { SecondaryThemeColor } from "../../theme/secondaryColor";

import Button from "../../common/Button";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  logo: {
    textAlign: "center"
  },
  clickMe: {
    textAlign: "center"
  },
  error: {
    fontWeight: 600,
    textAlign: "center",
    color: themeColor.red1
  },
  box1: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: SecondaryThemeColor.white,
    color: SecondaryThemeColor.aegean2,
    borderColor: SecondaryThemeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  },
  logo1: {
    textAlign: "center"
  },
  error1: {
    fontWeight: 600,
    textAlign: "center",
    color: SecondaryThemeColor.red1
  }
});

export class GoogleFinishRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      typeOfUser: "role",
      phone_number: "",
      errorMsg: "",
      primaryColor: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.phone_number === "" ||
      this.state.typeOfUser === "role" 
    ) {
      this.setState({ errorMsg: "Please complete all the fields." });
    } else {
      if (true) {
        const user = {
          username: this.state.username,
          email: this.state.email,
          typeOfUser: this.state.typeOfUser,
          phone_number: this.state.phone_number,
        };
		//Use of patch
        axios
          .post(
                  `http://127.0.0.1:8000/users-api/${this.state.username}/`,
                  {
                      username: this.state.username,
                      email: this.state.email,
                      authy_id: 103080772,
                      typeOfUser: this.state.typeOfUser,
                      phone_number: this.state.phone_number
                  }
              )
          .then(res => {
            if (res.status === 200) {
              this.props.storeUser(user);
              this.props.history.push("/2fa");
            }else {
              this.setState({
                errorMsg: "Error"
              });
            }
          });
          /*
          .catch(() => {
            this.setState({ errorMsg: "I dont know what the error was!" });
          });*/
      } else {
        this.setState({ errorMsg: "I really dont know what the error was" });
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.setState({ primaryColor: !this.state.primaryColor });
  };

    render() {
    const { auth } = this.props;
    const {username} = auth.user;
    const {email} = auth.user;
    console.log(username);
    console.log(email);
    this.state.username = username;
    this.state.email = email;
    const { primaryColor } = this.state;

    return (

      <div className={css(primaryColor ? styles.box : styles.box1)}>
        <h1 className={css(primaryColor ? styles.logo : styles.logo1)}>
          Medifast
        </h1>
        <br />
        {/*TODO: Create global form*/}
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <ControlLabel>Phone Number:</ControlLabel>
            <FormControl
              className={css(styles.inputBox)}
              type="text"
              pattern="[0-9]*"
              label="Phone Number"
              name="phonenumber"
              placeholder="Enter your phone number"
              //onInput={this.handleChange.bind(this)}
              value={this.state.phone_number}
              //onChange={this.onChange}
              onChange={event => this.setState({ phone_number: event.target.value.replace(/\D/, '') })}
            />
            <br />
            <ControlLabel>Role:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={this.onChange}
              name="typeOfUser"
            >
              <option value="role">Role</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Insurance">Insurance Provider</option>
            </FormControl>
            <Button
              name="Complete Your Registration"
              type="submit"
              color={primaryColor ? "primary" : "secondary"}
            />
          </FormGroup>
        </form>
        <div className={css(primaryColor ? styles.error : styles.error1)}>
          {this.state.errorMsg}
        </div>{" "}
      </div>
    );
  }
}

//GoogleFinishRegister.propTypes = { storeUser: PropTypes.func.isRequired };
GoogleFinishRegister.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { storeUser }
)(GoogleFinishRegister);