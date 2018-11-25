import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserList from "./UserList";

const styles = StyleSheet.create({});

class UserView extends React.Component {
  componentDidMount() {}

  render() {
    let userDisplay;
    try {
      const { auth } = this.props;
      const type = auth.user.type;
      if (type === "Doctor" || type === "Patient") {
        userDisplay = <UserList userType={type} />;
      } else {
        userDisplay = (
          <div>
            <UserList userType="Doctor" />
            <UserList userType="Patient" />
          </div>
        );
      }
    } catch (e) {
      if (e) {
        userDisplay = (
          <div>
            <UserList userType="Doctor" />
            <UserList userType="Patient" />
          </div>
        );
        console.error("User not find");
      }
    }
    return <div>{userDisplay} </div>;
  }
}

UserView.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserView);
