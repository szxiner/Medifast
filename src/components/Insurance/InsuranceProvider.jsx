import React from "react";

import { Row, Col } from "antd";
import { StyleSheet, css } from "aphrodite";

import Map from "../../common/Map";

const styles = StyleSheet.create({
  provideName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  provideInfo: {
    fontSize: 16
  }
});
export default class insuranceProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className={css(styles.provideName)}>Medicare Gold Plus®</div>
        <br />
        <div className={css(styles.provideInfo)}>
          Medicare Gold Plus is a Medicare Advantage health maintenance
          organization (HMO) plan that includes all the benefits of Original
          Medicare and may include prescription drug coverage and many extras.
        </div>
        <hr />
        <div className={css(styles.providerContact)}>
          <Row>
            <Col span={12}>
              <b>Contact Us:</b>
            </Col>
            <Col span={12}> 949-228-8063</Col>
          </Row>
          <Row>
            <Col span={12}>
              <b>Our Location:</b>
            </Col>
            <Col span={12}>
              900 E 7th St, <br />
              Bloomington, IN <br />
              47405
            </Col>
          </Row>
          <hr />
          <Map lat={40.0287983} lng={-105.2524828} w={278} />
        </div>
      </div>
    );
  }
}
