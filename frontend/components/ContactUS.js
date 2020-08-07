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
    "https://image.shutterstock.com/image-photo/young-tender-happy-mother-hugging-260nw-657764839.jpg",
};

import axios from "axios";
export default function ContactUS({ navigation }) {
  return (
    <ImageBackground
      source={image}
      style={style.image}
      imageStyle={{ opacity: 0.4 }}
    >
      <View>
        <View>
          <Formik
            initialValues={{
              text: "",
            }}
            onSubmit={(values) => {
              axios
                .post("http://192.168.127.43:5000/sendFeedBack", values)
                .then(function (res) {
                  console.log(res.data.token);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            {(props) => (
              <View>
                <View>
                  <Text style={{ marginRight: "30%", marginTop: "20%" }}>
                    Your FeedBack
                  </Text>
                </View>

                <Input
                  onChangeText={props.handleChange("text")}
                  value={props.values.password}
                  multiline={true}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderRadius: 10,
                    padding: 5,
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    height: "60%",
                  }}
                ></Input>
                {/* submit bttn  */}
                <View
                  style={{
                    marginLeft: "25%",
                  }}
                >
                  <Button
                    title="Send"
                    mode="contained"
                    color="rgba(255, 177, 40,0.6)"
                    onPress={props.handleSubmit}
                    Text="Send"
                  >
                    <Text style={{ color: "black" }}>Send</Text>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
