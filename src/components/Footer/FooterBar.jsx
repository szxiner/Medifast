import React from "react";
import store from "../../store";
import StickyFooter from "react-sticky-footer";
import { themeColor } from "../../theme/colors";
import { StyleSheet, css } from "aphrodite";

import { Icon } from "antd";

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "rgb(171, 195, 196)",
    color: themeColor.black,
    marginTop: "10%",
    height: "30%",
    width: "100%",
    border: "0px solid",
    borderRadius: 10,
    fontWeight: 500,
    fontSize: 16
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
    return (
      <StickyFooter className={css(styles.footer)} style={{ height: "50%" }}>
        <div align="center">
          <p style={{ height: "50%" }}>
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
      </StickyFooter>
    );
  }
}
