import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import store from "../../store";

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
          <Navbar styles={{ position: "fixed", width: "100%", top: 0 }}>
            <Navbar.Header>
              <Navbar.Brand />
              <Navbar.Brand>
                <Link to="/dashboard">Home</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <Navbar.Brand eventKey={2} href="#">
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
              <Navbar.Brand>
                <Link to="/">Home</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <Navbar.Brand eventKey={1} href="#">
                <Link to="/login">Log in</Link>
              </Navbar.Brand>
              <Navbar.Brand eventKey={2} href="#">
                <Link to="/register">Sign up</Link>
              </Navbar.Brand>
            </Nav>
          </Navbar>
        </div>
      );
    }
  }
}
