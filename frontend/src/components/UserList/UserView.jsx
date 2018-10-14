import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserList from "./UserList";

const styles = StyleSheet.create({});

class UserView extends React.Component {
  componentDidMount() {}

  render() {
    const { user } = this.props;

    let userDisplay;

    if (user.userType === "Doctor" || user.userType === "Patient") {
      userDisplay = <UserList userType={user.userType} />;
    } else {
      userDisplay = (
        <div>
          <UserList userType="Doctor" />
          <UserList userType="Patient" />
        </div>
      );
    }
    return <div>{userDisplay} </div>;
  }
}

UserView.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {}
)(UserView);
