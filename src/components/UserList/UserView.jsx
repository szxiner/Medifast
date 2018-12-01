import React from "react";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserList from "./UserList";
import { Navbar, FormGroup, FormControl, Button } from "react-bootstrap";
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
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  }
});

class UserView extends React.Component {
  componentDidMount() {}

  render() {
    let userDisplay;
    try {
      const { auth } = this.props;
      const type = auth.user.type;
      if (type === "Doctor" || type === "Patient") {
        //<div className={css(styles.box)}>
        userDisplay = <UserList userType={type} />;
        //</div>;
      } else if (type === "Doctor") {
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
