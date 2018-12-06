import React from "react";
import { StyleSheet, css } from "aphrodite";
import Slider from "react-animated-slider";
import { Grid, Row, Col, Image } from "react-bootstrap";
import Plx from "react-plx";

import { themeColor } from "../../theme/colors";

import LandingNavbar from "../Layout/LandingNavbar";
import "react-animated-slider/build/horizontal.css";
import "./slider-animations.css";
import "./style.css";
import smile from "../../images/smile.png";
import doctors from "../../images/doctors.png";
import piggy from "../../images/piggy.png";
import usmap from "./usmap.png";
import map from "./map.jpg";

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
  flexBody: {
    display: "flex",
    //marginRight: "0px"
    justifyContent: "center"
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
      "linear-gradient(150deg, #0a3d62 15%,  #60a3bc 70%, #82ccdd 15%)"
  },
  ourTeam: {
    fontSize: 44,
    marginTop: "4%",
    textAlign: "center",
    maxWidth: "100%",
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "underline",
    fontStyle: "italic"
  }
});

const parallaxData = [
  {
    start: 0,
    duration: 600,
    properties: [
      {
        startValue: 0,
        endValue: 100,
        property: "translateY"
      },
      {
        startValue: 0.3,
        endValue: 1,
        property: "opacity"
      }
    ]
  }
];

const titleParallax = [
  {
    start: 400,
    duration: 600,
    properties: [
      {
        startValue: 0.3,
        endValue: 1,
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

const mapParallax = [
  {
    start: 1000,
    duration: 700,
    properties: [
      {
        startValue: -600,
        endValue: 0,
        property: "translateX"
      },
      {
        startValue: 0.3,
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
      "Caring for you and your families. We strive in providing effective healthcare at excellent value and to be the preferred choice for families and businesses.",
    image:
      "https://images.unsplash.com/photo-1496163668521-39614a16b23f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4ffc1585e1d793f0b0f33d16d1a7fe01&auto=format&fit=crop&w=2089&q=80"
  },
  {
    title: "Medifast",
    description:
      "For years, we have helped build healthier, stronger communities. Let us be your partner in good health - at your doctor's office, at your workplace, at home and in your community",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be4042f7cc4661f473ebc3edcdb9765a&auto=format&fit=crop&w=2089&q=80"
  },
  {
    title: "Medifast",
    description:
      "If you need an all-in-one Medicare Advantage plan or supplemental coverage, we can help you find the right plan.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1b566f6cf95b8fe438961fd065158cd&auto=format&fit=crop&w=1950&q=80"
  }
];

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <LandingNavbar />
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
                    <div className={css(styles.subTitle)}>Our Plans</div>
                    <hr />
                    <div>
                      Stay on top of your health with Medicare plans that may
                      include prescription, dental and vision coverage.
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
                    <div className={css(styles.subTitle)}>Our Doctors</div>
                    <hr />
                    <div>
                      Virtually all medical services you may need — doctor
                      visits, testing, surgery, hospital care — are available
                      "under one roof" at Medifast.
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
                      <div className={css(styles.subTitle)}>
                        We value your money
                      </div>
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
            style={{
              position: "relative",
              bottom: 0,
              width: "100%",
              height: "10vw"
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon fill="#DEE1E3" points="0,0 100,0 100,100" />
          </svg>
          <div>
            <br />
            <br />
            <br />
            <Plx className="TitleParallax" parallaxData={titleParallax}>
              <div className={css(styles.ourTeam)}> PLACEHOLDER</div>
              <div
                style={{
                  marginTop: "2%",
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "normal",
                  fontSize: 24,
                  fontStyle: "italic",
                  maxWidth: "100%"
                }}
              >
                "Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum."
              </div>
            </Plx>
            {/* Our Team */}
          </div>
        </div>
        <div style={{ marginTop: -100 }}>
          <svg
            style={{
              position: "relative",
              bottom: 0,
              width: "100%",
              height: "10vw"
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon fill="#DEE1E3" points="0,0 0,100 100,100" />
          </svg>
        </div>

        <Plx className="TitleParallax" parallaxData={mapParallax}>
          <div
            style={{
              marginTop: 48,
              textAlign: "center",
              color: "#304B5C",
              fontWeight: "bold",
              fontSize: 24,
              maxWidth: "100%"
            }}
          >
            <Grid style={{ width: "100%" }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  // marginLeft: 80,
                  width: "100%",
                  height: 520
                }}
              >
                <Row>
                  <Col xs={10} md={7}>
                    <div
                      style={{
                        marginLeft: 22,
                        height: 520
                      }}
                    >
                      <Image
                        src={usmap}
                        style={{ width: 750, marginLeft: 10, marginTop: 20 }}
                      />
                    </div>
                  </Col>
                  <Col xs={8} md={5}>
                    <div
                      style={{
                        marginLeft: 50,
                        height: 520,
                        backgroundColor: "#ABC3C4",
                        lineHeight: "60px"
                      }}
                    >
                      Insurance and Doctor avaliable in <br />
                      <div style={{ fontSize: 56, color: "#1D2F4B" }}>
                        10+ States
                      </div>
                      Get covered where ever you are.
                      <Image src={map} style={{ width: 408, marginTop: 20 }} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Grid>
          </div>
        </Plx>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
