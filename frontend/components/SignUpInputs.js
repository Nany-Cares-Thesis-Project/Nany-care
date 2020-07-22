// import EnterName from './App/Components/EnterName

import React from "react";

import {
  Text,
  AppRegistry,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { requireNativeViewManager } from "expo-core";

export default class SignUpInputs extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  handlename = (text) => {
    this.setState({ name: text });
  };
  handlephoneNumber = (text) => {
    this.setState({ phoneNumber: text });
  };

  SingUp = (email, pass) => {
    alert("email: " + email + " password: " + pass);
  };

  render() {
    return (
      <View>
        <View>
          <TextInput
            style={style.inputs}
            onChangeText={(text) => onChangeText(text)}
            placeholder="Enter email"
            type='email'
            onChangeText={this.handleEmail}
            
          />
        </View>

        <View>
          <TextInput
            secureTextEntry={true}
            style={style.inputs}
            placeholder="Enter Password"
            onChangeText={this.handlePassword}
          />
        </View>
        <View>
          <TextInput
            style={style.inputs}
            placeholder="Enter Name"
            onChangeText={this.handlename}
          />
        </View>
        <View>
          <TextInput
            style={style.inputs}
            placeholder="Enter Phone Number"
            type='tel'
            onChangeText={this.handlephoneNumber}
          />
        </View>

        <TouchableOpacity
          style={style.submitButton}
          onPress={() =>
            this.SingUp(
              this.state.email,
              this.state.password,
              this.state.name,
              this.state.phoneNumber
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
