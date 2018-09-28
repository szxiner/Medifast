import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  landingNavbar: {
    margin: 0,
    position: "float",
    background: themeColor.white,
    borderBottom: themeColor.grey3
  }
});

export default class LandingNavbar extends React.Component {
  render() {
    return (
      <Navbar className={css(styles.landingNavbar)}>
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
    );
  }
}
