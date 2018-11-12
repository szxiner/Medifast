import React from "react";
import { StyleSheet, View } from "react-native";

import Routers from "./component/Routers";

export default class App extends React.Component {
  render() {
    return <View style={styles.container}>{/* <Routers /> */}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38ada9",
    alignItems: "center",
    justifyContent: "center"
  }
});
