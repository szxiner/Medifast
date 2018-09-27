import React from "react";
import { Grid, Col, Row } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";

const styles = StyleSheet.create({
  index: {
    width: "100%",
    height: "100%",
    display: "flex"
  },
  indexRow: {
    // height: "100%"
    // // display: "table-row"
  },
  indexContent: {
    backgroundColor: themeColor.white
  },
  indexImage: {
    backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #1D3557 100%)"
  }
});
export default class Landing extends React.Component {
  render() {
    return (
      <div className={css(styles.index)}>
        {/* <Grid>
          <Row className={css(styles.indexRow)}>
            <Col className={css(styles.indexContent)} xs={12} md={8}>
              left
            </Col>
            <Col className={css(styles.indexImage)} xs={6} md={4}>
              right
            </Col>
          </Row>
        </Grid> */}
        hello
      </div>
    );
  }
}
