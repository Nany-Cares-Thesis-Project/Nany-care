// import EnterName from './App/Components/EnterName
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { requireNativeViewManager } from "expo-core";

// components import
import LoginPage from "./Login";
import GoogleLogin from "./GoogleLogin";
import SignUpInputs from "./SignUpInputs";

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.onPressLearnMore = this.onPressLearnMore.bind(this);
  }
  onPressLearnMore() {}
  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior="position" disabled>
          <View
            style={{ marginTop: 50, marginLeft: "auto", marginRight: "auto" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#E88877",
                marginTop: 100,
              }}
            >
              Welcome To Nany App !
            </Text>
          </View>

          <SignUpInputs />

          <View></View>

          {/* own buttons design */}

          <TouchableOpacity>
            <Text
              style={style.textButton}
              onPress={() => navigation.navigate("LoginPage")}
            >
              Sign Up{" "}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  title: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  textButton: {
    width: 140,
    padding: 10,
    fontSize: 20,
    marginTop: 10 + "%",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    borderRadius: 30,
    color: "white",
    textAlign: "center",
    backgroundColor: "#E88877",
  },
});
