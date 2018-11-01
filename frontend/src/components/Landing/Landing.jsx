import React from "react";
import { StyleSheet, css } from "aphrodite";
import { themeColor } from "../../theme/colors";
import browser1 from "../../images/browser1.svg";
import browser2 from "../../images/browser2.svg";

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
  img1: { position: "fixed", bottom: 300, right: 400 },
  img2: { position: "fixed", bottom: 160, right: 640 }
});
export default class Landing extends React.Component {
  render() {
    return (
      <div data-it="landing" className={css(styles.index)}>
        {/*TODO: index page is not responsive yet*/}
        <div className={css(styles.indexContent)}>
          <div className={css(styles.logo)}>Medifast</div>
          <div className={css(styles.slogan)}>
            Digital software to elevate your health care experience.
          </div>
        </div>
        <div className={css(styles.img1)}>
          <img src={browser1} width="280%" />
        </div>
        <div className={css(styles.img2)}>
          <img src={browser2} width="180%" />
        </div>

        <div className={css(styles.indexImage)} />
      </div>
    );
  }
}
