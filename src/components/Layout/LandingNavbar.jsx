import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";

const { Header } = Layout;

class LandingNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }

  componentDidMount() {
    const { isAuth } = this.props;
    if (isAuth) {
      this.setState({ isAuth: true });
    }
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div
            style={{
              width: "120px",
              height: "31px",
              margin: "10px 24px 16px 0",
              float: "left"
            }}
            className="logo"
          >
            <Link to="/">
              <h1>Medifast</h1>
            </Link>
          </div>
          {this.state.isAuth ? (
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px", float: "right", fontSize: 20 }}
            >
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="export" />
                  Log out
                </Link>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px", float: "right", fontSize: 20 }}
            >
              <Menu.Item key="1">
                <Link to="/login">
                  <Icon type="user" />
                  Log in
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/register">
                  <Icon type="user-add" />
                  Sign up
                </Link>
              </Menu.Item>
            </Menu>
          )}
        </Header>
      </Layout>
    );
    // if (this.state.isAuth) {
    //   return (
    //     <div>
    //       <Navbar>
    //         <Navbar.Header>
    //           <Navbar.Brand />
    //           <Navbar.Brand>
    //             <Link to="/dashboard">
    //               <h1 style={{ fontSize: 28 }}>Medifast</h1>
    //             </Link>
    //           </Navbar.Brand>
    //         </Navbar.Header>
    //         <Nav pullRight>
    //           <Navbar.Brand eventKey={2} href="#" color="#000">
    //             <Link to="/">Log out</Link>
    //           </Navbar.Brand>
    //         </Nav>
    //       </Navbar>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div style={{ containterWidth: "auto" }}>
    //       <Navbar>
    //         <Navbar.Header>
    //           <Nav pullLeft>
    //             <Navbar.Brand>
    //               <Link to="/">
    //                 <h1 style={{ fontSize: 26 }}>Medifast</h1>
    //               </Link>
    //             </Navbar.Brand>
    //           </Nav>
    //         </Navbar.Header>
    //         <Nav pullRight>
    //           <Navbar.Brand eventKey={1} href="#">
    //             <Link to="/login" color="#000">
    //               Log in
    //             </Link>
    //           </Navbar.Brand>
    //           <Navbar.Brand
    //             eventKey={2}
    //             href="#"
    //             color="#000"
    //             borderColor="white"
    //           >
    //             <Link to="/register">Sign up</Link>
    //           </Navbar.Brand>
    //         </Nav>
    //       </Navbar>
    //     </div>
    //   );
    // }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(LandingNavbar);
