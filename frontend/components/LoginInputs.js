import React from "react";
import { Formik } from "formik";
import { View } from "react-native-animatable";
import { Button, Input, Text } from "galio-framework";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { AsyncStorage } from "react-native";

const image = {
  uri:
    "https://cdn.pixabay.com/photo/2017/06/18/18/39/baby-2416718_960_720.jpg",
};
const logo = {
  uri:
    "https://firebasestorage.googleapis.com/v0/b/moodywebsite-90fb4.appspot.com/o/images%2Fnanny-care%20(2).gif?alt=media&token=87a5a190-55dd-4d89-b812-8fec295cf18c",
};
import axios from "axios";
export default function Login({ navigation }) {
  return (
    <ImageBackground
      source={image}
      style={style.image}
      imageStyle={{ opacity: 0.4 }}
    >
      <Image source={logo} style={style.logo} resizeMode="center"></Image>
      <View>
        <View>
          <Formik
            initialValues={{
              Email: "",
              password: "",
            }}
            onSubmit={(values) => {
              axios
                .post("http://192.168.127.43:5000/login", values)
                .then(function (res) {
                  console.log(res.data.token);
                  if (res.data.token) {
                    AsyncStorage.setItem(
                      "token",
                      JSON.stringify(res.data.token)
                    );
                    navigation.navigate("AllNany");
                  } else {
                    if (res.data === "User not exist") {
                      alert(" User does not exist");
                    }
                    if (res.data === "password or email wrong") {
                      alert("wrong password or email");
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            {(props) => (
              <View>
                {/* Email input */}
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Text>E-mail</Text>

                  <MaterialIcons name="email" size={24} color="black" />
                </View>

                <Input
                  onChangeText={props.handleChange("Email")}
                  value={props.values.Email}
                  onBlur={function ValidateEmail(mail) {
                    if (
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        props.values.Email
                      )
                    ) {
                      return true;
                    }
                    alert("You have entered an invalid email address!");
                    return false;
                  }}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 5,
                    padding: 5,
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                  }}
                ></Input>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Text>password</Text>
                </View>

                <Input
                  secureTextEntry={true}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 5,
                    padding: 5,
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                  }}
                ></Input>
                {/* submit bttn  */}
                <View
                  style={{
                    marginLeft: "25%",
                  }}
                >
                  <Button
                    title="login"
                    mode="contained"
                    color="rgba(255, 177, 40,0.6)"
                    onPress={props.handleSubmit}
                    Text="Login"
                  >
                    <Text style={{ color: "black" }}>Login</Text>
                  </Button>
                </View>
                <View
                  style={{
                    marginLeft: "25%",
                  }}
                >
                  <Button
                    title="SignUp"
                    mode="contained"
                    Text="SignUp"
                    color="rgba(255, 177, 40,0.6)"
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text style={{ color: "black" }}>SignUp</Text>
                  </Button>
                </View>
                <View
                  style={{
                    marginLeft: "25%",
                  }}
                >
                  <Button
                    title="HiringForm"
                    mode="contained"
                    Text="HiringForm"
                    color="rgba(255,255,255,0.4)"
                    style={{
                      width: "70%",
                      textAlign: "center",
                      marginRight: "80%",
                      marginLeft: "-4%",
                    }}
                    onPress={() => navigation.navigate("HiringForm")}
                  >
                    <Text style={{ color: "#ffb028" }}>
                      Intrested to be a Nanny?
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ImageBackground>
  );
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
  logo: {
    flex: 1,
    height: "50%",
    width: "50%",
    marginLeft: "25%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
