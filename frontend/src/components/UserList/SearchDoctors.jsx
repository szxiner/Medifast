import React from "react";
import _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Search } from "antd";
import { themeColor } from "../../theme/colors";
import { Input } from "antd";

const styles = StyleSheet.create({
  box: {
    margin: "auto",
    marginTop: "8%",
    width: "60%",
    height: "70%",
    padding: 50,
    backgroundColor: themeColor.white,
    color: themeColor.aegean2,
    borderColor: themeColor.grey3,
    borderRadius: 8,
    "@media (max-width: 600px)": {
      // TODO: Not responsive for mobile. Will Fix later
    }
  }
});

export default class SearchDoctors extends React.Component {
  render() {
    const Search = Input.Search;
    return (
      <div className={css(styles.box)}>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          enterButton
        />
        <br />
      </div>
    );
  }
}
