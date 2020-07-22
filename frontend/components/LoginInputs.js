// import EnterName from './App/Components/EnterName

import React from "react";
import { AppRegistry, View, StyleSheet, TextInput } from "react-native";
import { requireNativeViewManager } from "expo-core";

export default class LoginInputs extends React.Component {
  state = {
    email: "",
    password: "",
  };
  login = (email, pass) => {
    alert("email: " + email + " password: " + pass);
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  render() {
    return (
      <View>
        <View>
          <TextInput style={style.inputs}
           placeholder="Enter email" />
        </View>

        <View>
          <TextInput
            secureTextEntry={true}
            style={style.inputs}
            placeholder="Enter Password"
          />
        </View>
        <TouchableOpacity
          style={style.submitButton}
          onPress={() =>
            this.login(
              this.state.email,
              this.state.password
              
            )
          }
        >
          <Text style={style.textButton}>Sign Up </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const style = StyleSheet.create({
  inputs: {
    marginTop: 50,
    color: "#6FE6E0",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "#6FE6E0",
    borderBottomWidth: 2,
  },
});
