// import EnterName from './App/Components/EnterName
import React from "react";
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { requireNativeViewManager } from "expo-core";

import LoginInputs from "./LoginInputs";

export default class LoginPage extends React.Component {
  
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
                color: "#CC7575",
                marginTop: 150,
              }}
            >
              Welcome To Nany App !
            </Text>
          </View>

          <LoginInputs />

          <TouchableOpacity style={{ center: "auto" }}>
            <Text style={style.textButton}>Login</Text>
          </TouchableOpacity>

          <View style={style.center}>
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  padding: 20,
                  margin: 10,
                  color: "#CC7575",
                }}
                onPress={this.props.onPressCreateAcc}
              >
                create an Account ?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  title: {
    color: "#8E9BEA",
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  textButton: {
    width: 140,
    padding: 10,
    fontSize: 20,
    marginTop: 100,
    marginLeft: 100,
    fontWeight: "bold",
    borderRadius: 30,
    color: "white",
    textAlign: "center",
    backgroundColor: "#CC7575",
  },
});
