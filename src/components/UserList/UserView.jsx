import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserList from "./UserList";
import { themeColor } from "../../theme/colors";

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
    borderRadius: 8
  }
});

class UserView extends React.Component {
  componentDidMount() {}

  render() {
    console.log(this.props.auth);
    let userDisplay;
    try {
      const { auth } = this.props;
      const type = auth.user.type;
      if (type === "Doctor" || type === "Patient") {
        userDisplay = <UserList userType={type} />;
      }
      //else if (type === "Doctor") { }
      else {
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
    console.log(userDisplay, "userDisplay");
    return <div>{userDisplay} </div>;
  }
}

// UserView.propTypes = {
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(UserView);
