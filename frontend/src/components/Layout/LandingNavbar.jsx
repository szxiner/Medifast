import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, Button, Collapse } from "react-bootstrap";
import store from "../../store";
import DashboardSideBar from "../Dashboard/DashboardSideBar";

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
    if (this.state.isAuth) {
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand />
              <Navbar.Brand>
                <Link to="/dashboard">Home</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <Navbar.Brand eventKey={2} href="#">
                <Link to="/logout">Log out</Link>
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
