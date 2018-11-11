import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
export class Logo extends Component {
  render() {
    return (
      <View style={styles.logo}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/doctor.png")}
        />
        <Text style={styles.text}>Welcome to Medifast.</Text>
        <Text style={styles.text}>
          A digital platform to elevate your health care experience.
        </Text>
      </View>
    );
  }
}

export default Logo;

const styles = StyleSheet.create({
  logo: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 24
  },
  text: {
    color: "#b8e994"
  }
});
