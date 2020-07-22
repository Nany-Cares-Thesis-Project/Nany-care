// import EnterName from './App/Components/EnterName
import React from "react";
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { requireNativeViewManager } from "expo-core";

// components import
import FbLogin from "./FbLogin";
import GoogleLogin from "./GoogleLogin";
import SignUpInputs from "./SignUpInputs";

export default class SignUpPage extends React.Component {
  

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
 
});
