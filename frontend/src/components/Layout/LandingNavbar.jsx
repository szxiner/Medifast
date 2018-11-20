import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import store from "../../store";
import nav from "./nav.css";
import { css } from "aphrodite";

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
    });
  }

  render() {
    if (this.state.isAuth) {
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand />
              <Navbar.Brand>
                <Link to="/dashboard">
                  <h1 style={{ fontSize: 28 }}>Medifast</h1>
                </Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <Navbar.Brand eventKey={2} href="#" color="#000">
                <Link to="/">Log out</Link>
              </Navbar.Brand>
            </Nav>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Nav pullLeft>
                <Navbar.Brand>
                  <Link to="/">
                    <h1 style={{ fontSize: 26 }}>Medifast</h1>
                  </Link>
                </Navbar.Brand>
              </Nav>
            </Navbar.Header>
            <Nav pullRight>
              <Navbar.Brand eventKey={1} href="#">
                <Link to="/login" color="#000">
                  Log in
                </Link>
              </Navbar.Brand>
              <Navbar.Brand eventKey={2} href="#" color="#000">
                <Link to="/register">Sign up</Link>
              </Navbar.Brand>
            </Nav>
          </Navbar>
        </div>
      );
    }
  }
}
