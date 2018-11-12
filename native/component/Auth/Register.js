import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Logo from "./Logo";
export class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signupText}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputBox: {
    marginTop: 16,
    width: 320,
    height: 48,
    backgroundColor: "#78e08f",
    borderRadius: 25,
    paddingHorizontal: 16,
    color: "#fff"
  },
  loginButton: {
    marginTop: 16,
    width: 320,
    height: 48,
    backgroundColor: "#079992",
    borderRadius: 25,
    paddingVertical: 11
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center"
  },
  signupText: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 16,
    flexDirection: "row"
  }
});
