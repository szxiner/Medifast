import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import store from "../../store";

const styles = StyleSheet.create({});

export default class DashboardMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // need to have log out feature
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            <Link to="/login">Log out</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
