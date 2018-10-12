import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { themeColor } from "../../theme/colors";
import store from "../../store";

const styles = StyleSheet.create({
  landingNavbar: {
    margin: 0,
    position: "float",
    background: themeColor.white,
    borderBottom: themeColor.grey3
  },
  hideNav: { display: "none" }
});

export default class LandingNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
    store.subscribe(() => {
      this.setState({
        isAuth: store.getState().auth.isAuth
      });
      console.log(this.state.isAuth);
    });
  }

  render() {
    return (
      <div className={css(this.state.isAuth && styles.hideNav)}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <Link to="/login">Log in</Link>
            </NavItem>
            <NavItem eventKey={2} href="#">
              <Link to="/register">Sign up</Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
