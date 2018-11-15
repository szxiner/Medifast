import React from "react";
import store from "../../store";
import StickyFooter from "react-sticky-footer";
import { themeColor } from "../../theme/colors";
import { StyleSheet, css } from "aphrodite";
import fb from "./fb.png";
import insta from "./insta.svg";
import { Icon } from "antd";

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#EEEEEE    ",
    color: themeColor.black,
    marginTop: "10%",
    height: "5%",
    width: "100%",
    border: "0px solid",
    borderRadius: 5,
    fontWeight: 500
  }
});

export default class FooterBar extends React.Component {
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
        <StickyFooter
          bottomThreshold={0}
          normalStyles={{
            backgroundColor: "#80D8FF",
            padding: "2rem"
          }}
          stickyStyles={{
            backgroundColor: "#80D8FF",
            padding: "2rem"
          }}
        >
          After Login
        </StickyFooter>
      );
    } else {
      return (
        <footer className={css(styles.footer)}>
          <div align="center">
            <p>
              Follow us at &nbsp;
              <a
                href="https://www.facebook.com/562405647546416"
                class="fa fa-facebook"
              >
                <Icon
                  type="facebook"
                  theme="filled"
                  style={{ fontSize: "20px", color: "#08c" }}
                />
                {"           "}
              </a>
              <a
                href="https://www.instagram.com/medifast_healthcare/"
                class="fa fa-facebook"
              >
                <Icon
                  type="instagram"
                  style={{
                    fontSize: "20px",
                    color: "#F44336 "
                  }}
                />
                {"           "}
              </a>
              <a href="https://twitter.com/Medifast4" class="fa fa-facebook">
                <Icon
                  type="twitter"
                  style={{
                    fontSize: "20px",
                    color: "#08c"
                  }}
                />
              </a>
            </p>
            <p>
              Medifast © 2018 | {"       "}
              <a href="mailto:medifastiu@gmail.com">medifastiu@gmail.com</a>
            </p>
          </div>
        </footer>
      );
    }
  }
}
