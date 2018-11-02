import React from "react";
import { StyleSheet, css } from "aphrodite";
import Slider from "react-animated-slider";
import { Grid, Row, Col, Image } from "react-bootstrap";
import Plx from "react-plx";

import { themeColor } from "../../theme/colors";
import "react-animated-slider/build/horizontal.css";
// import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./style.css";
import smile from "../../images/smile.png";
import doctors from "../../images/doctors.png";
import piggy from "../../images/piggy.png";

// TODO: CSS is a mess, fix it
const styles = StyleSheet.create({
  indexButton: {
    backgroundColor: themeColor.red0,
    color: themeColor.white,
    marginTop: "5%",
    height: "18%",
    width: "22%",
    border: "0px solid",
    borderRadius: 5,
    fontWeight: 500
  },
  index: {
    display: "flex",
    margin: "auto",
    height: "95%",
    flexWrap: "wrap",
    alignItems: "stretch",
    alignContent: "stretch"
  },
  indexContent: {
    flexGrow: 1,
    backgroundColor: themeColor.white,
    paddingTop: "12%",
    paddingBottom: "22%",
    paddingLeft: "8%",
    width: "60%",
    "@media (max-width: 600px)": {
      marginTop: 36
    }
  },
  indexImage: {
    flexGrow: 1,
    width: "40%",
    backgroundImage: "linear-gradient(#B2C9D7, #5798A8)"
  },
  logo: {
    fontFamily: ["Pacifico", "cursive"],
    fontSize: 52,
    color: "black"
  },
  slogan: {
    marginTop: 50,
    width: "70%",
    lineHeight: 1.2,
    fontSize: 36,
    fontWeight: 500,
    paddingBottom: 50,
    borderBottom: "1px solid"
  },
  sec: {
    marginTop: "15%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "15%",
    position: "relative",
    padding: 32,
    borderRadius: 8,
    backgroundColor: themeColor.white
  },
  img: {
    display: "block",
    weight: "100%"
  },
  subTitle: {
    marginTop: "10%",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center"
  },
  backgroundSec: {
    position: "relative",
    height: 600,
    zIndex: -1,
    backgroundImage:
      "linear-gradient(150deg, #53f 15%,  #05d5ff 70%, #a6ffcb 15%)"
  },
  ourTeam: {
    marginTop: "4%",
    width: "100%",
    textAlign: "center",
    color: "#0c2461",
    fontWeight: "bold",
    textDecoration: "underline",
    fontStyle: "italic"
  }
});

const parallaxData = [
  {
    start: 0,
    duration: 100,
    properties: [
      {
        startValue: 0,
        endValue: 100,
        property: "translateY"
      },
      {
        startValue: 0.7,
        endValue: 1,
        property: "opacity"
      }
    ]
  }
];

const titleParallax = [
  {
    start: 400,
    duration: 500,
    properties: [
      {
        startValue: 1,
        endValue: 3,
        property: "scale"
      },
      {
        startValue: 0.7,
        endValue: 1,
        property: "opacity"
      }
    ]
  }
];

const content = [
  {
    title: "Medifast",
    description:
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
    image:
      "https://images.unsplash.com/photo-1496163668521-39614a16b23f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4ffc1585e1d793f0b0f33d16d1a7fe01&auto=format&fit=crop&w=2089&q=80"
  },
  {
    title: "Medifast",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be4042f7cc4661f473ebc3edcdb9765a&auto=format&fit=crop&w=2089&q=80"
  },
  {
    title: "Medifast",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1b566f6cf95b8fe438961fd065158cd&auto=format&fit=crop&w=1950&q=80"
  }
];

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <Slider className="slider-wrapper" autoplay="6000">
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{
                background: `url('${item.image}') no-repeat center center`
              }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div className={css(styles.grid)}>
          <Grid style={{ width: "90%" }}>
            <Row>
              <Col xs={6} md={4}>
                <Plx className="ImageParallax" parallaxData={parallaxData}>
                  <div className={css(styles.sec)}>
                    <Image
                      src={smile}
                      circle
                      style={{
                        width: "70%",
                        marginLeft: "15%"
                      }}
                    />
                    <div className={css(styles.subTitle)}>PlaceHolder</div>
                    <hr />
                    <div>
                      Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                      venenatis vestibulum. Fusce dapibus, tellus ac cursus
                      commodo, tortor mauris condimentum nibh, ut fermentum
                      massa justo sit amet risus. Cras justo odio, dapibus ac
                      facilisis.
                    </div>
                  </div>
                </Plx>
              </Col>
              <Col xs={6} md={4}>
                <Plx className="ImageParallax" parallaxData={parallaxData}>
                  <div className={css(styles.sec)}>
                    <Image
                      src={doctors}
                      circle
                      style={{
                        width: "70%",
                        marginLeft: "15%"
                      }}
                    />
                    <div className={css(styles.subTitle)}>PlaceHolder</div>
                    <hr />
                    <div>
                      Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                      venenatis vestibulum. Fusce dapibus, tellus ac cursus
                      commodo, tortor mauris condimentum nibh, ut fermentum
                      massa justo sit amet risus. Cras justo odio, dapibus ac
                      facilisis.
                    </div>
                  </div>
                </Plx>
              </Col>
              <Col xs={6} md={4}>
                <Plx className="ImageParallax" parallaxData={parallaxData}>
                  <div className={css(styles.sec)}>
                    <div className={css(styles.img)}>
                      <Image
                        src={piggy}
                        circle
                        style={{
                          width: "70%",
                          marginLeft: "15%"
                        }}
                      />
                      <div className={css(styles.subTitle)}>PlaceHolder</div>
                      <hr />
                      <div>
                        Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                        venenatis vestibulum. Fusce dapibus, tellus ac cursus
                        commodo, tortor mauris condimentum nibh, ut fermentum
                        massa justo sit amet risus. Cras justo odio, dapibus ac
                        facilisis.
                      </div>
                    </div>
                  </div>
                </Plx>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className={css(styles.backgroundSec)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon fill="#f4f5f5" points="0,0 100,0 100,100" />
          </svg>
          <div className={css(styles.ourTeam)}>
            <Plx className="TitleParallax" parallaxData={titleParallax}>
              OUR TEAM
            </Plx>
            {/* Our Team */}
          </div>
        </div>
        <div style={{ marginTop: -100 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon fill="#f4f5f5" points="0,0 0,100 100,100" />
          </svg>
        </div>
      </div>
    );
  }
}
