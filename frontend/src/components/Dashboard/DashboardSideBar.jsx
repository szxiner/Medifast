import React from "react";
import { Tab, Row, Col, Nav, NavItem } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import Dashboardinfo from "./Dashboardinfo";
const styles = StyleSheet.create({
  DashboardSideBar: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

export default class DashboardSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={css(styles.DashboardSideBar)}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={3}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">Doctor Information</NavItem>
                <NavItem eventKey="second">Insurance Information</NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  {" "}
                  <Dashboardinfo />
                </Tab.Pane>
                <Tab.Pane eventKey="first">
                  <Dashboardinfo />{" "}
                </Tab.Pane>
                <Tab.Pane eventKey="second"> </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}
