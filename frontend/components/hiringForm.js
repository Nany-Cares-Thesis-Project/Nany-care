import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import { View } from "react-native-animatable";
import TextTicker from "react-native-text-ticker";
import { Button, Input, Text } from "galio-framework";
import * as yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";
const image = {
  uri:
    "https://cdn.pixabay.com/photo/2015/06/23/09/13/music-818459_960_720.jpg",
};
const reviewSchema = yup.object({
  Name: yup.string().strict().required(),

  Age: yup
    .number()
    .required()
    .test("is-age-<18", "you must be 18 or older", (val) => {
      return parseInt(val) > 18 && parseInt(val) < 100;
    }),

  NumberOfKidsYouCanHandel: yup
    .number()
    .required()
    .test(
      "is-numkids->0",
      "you must atleast be able to deal with one kid",
      (val) => {
        return parseInt(val) > 0 && parseInt(val) < 11;
      }
    ),

  Place: yup.string().required(),

  EducationLevel: yup.string().required(),

  HowMannyHoursYouCanWorkADay: yup
    .number()
    .required()
    .test("is-workH->1-9", "invalid number of work hours", (val) => {
      return parseInt(val) > 1 && parseInt(val) < 10;
    }),

  ExperensLevel: yup.string().required(),
});

export default function HiringForm() {
  const [showAlert, setshowAlert] = useState(false);
  showAlertfun = () => {
    setshowAlert(true);
  };

  hideAlertfun = () => {
    setshowAlert(false);
  };
  return (
    <ImageBackground
      source={image}
      style={styles.image}
      imageStyle={{ opacity: 0.5 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ marginTop: "10%", marginBottom: "30%" }}>
          <View>
            <TextTicker
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginTop: 50,
                marginBottom: 50,
              }}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
            >
              Welcome to Nany Family .. Welcome to Nany Family... Welcome to
              Nany Family
            </TextTicker>
            <View>
              <Formik
                initialValues={{
                  Name: "",
                  Age: "",
                  Email: "",
                  PhoneNumber: "",
                  NumberOfKidsYouCanHandel: "",
                  Place: "",
                  EducationLevel: "",
                  HowMannyHoursYouCanWorkADay: "",
                  ExperensLevel: "",
                }}
                validationSchema={reviewSchema}
                onSubmit={(values) => {
                  console.log(values);
                  axios
                    .post("http://192.168.127.43:5000/HiringForm", values)
                    .then(function (response) {
                      console.log(response);
                      alert(
                        "Thank you , we will contact you as soon as possible"
                      );
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              >
                {(props) => (
                  <View>
                    {/* Name inpute */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "70%",
                      }}
                    >
                      <Text>Name</Text>

                      <MaterialIcons
                        name="perm-identity"
                        size={24}
                        color="black"
                      />
                    </View>
                    <Input
                      onChangeText={props.handleChange("Name")}
                      value={props.values.Name}
                      onBlur={props.handleBlur("Name")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        borderColor: "#ffb028",
                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for name */}
                    <Text> {props.touched.Name && props.errors.Name} </Text>

                    {/* Age input */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "80%",
                      }}
                    >
                      <Text> Age </Text>
                    </View>
                    <Input
                      onChangeText={props.handleChange("Age")}
                      value={props.values.Age}
                      onBlur={props.handleBlur("Age")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        borderColor: "#ffb028",

                        width: "80%",
                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for age */}
                    <Text> {props.touched.Age /* && props.errors.Age */} </Text>

                    {/* Email input  */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "70%",
                      }}
                    >
                      <Text> E-mail </Text>
                      <Fontisto name="email" size={24} color="black" />
                    </View>
                    <Input
                      onChangeText={props.handleChange("Email")}
                      value={props.values.Email}
                      onBlur={props.handleBlur("Email")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        borderColor: "#ffb028",

                        width: "80%",
                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for email */}
                    <Text> {props.touched.Email && props.errors.Email} </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "57%",
                      }}
                    >
                      <Text> Phone Number </Text>
                      <Entypo name="phone" size={24} color="black" />
                    </View>
                    {/* PhoneNumber input */}
                    <Input
                      onChangeText={props.handleChange("PhoneNumber")}
                      value={props.values.PhoneNumber}
                      onBlur={props.handleBlur("PhoneNumber")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        borderColor: "#ffb028",

                        width: "80%",
                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for phonenumber */}
                    <Text>
                      {" "}
                      {props.touched.PhoneNumber &&
                        props.errors.PhoneNumber}{" "}
                    </Text>

                    {/* NumberOfKidsYouCanHandel input */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "30%",
                      }}
                    >
                      <Text> How many kids you can handle </Text>
                      <FontAwesome5
                        name="baby-carriage"
                        size={24}
                        color="black"
                      />
                    </View>
                    <Input
                      placeholder="Enter number between 1-9"
                      onChangeText={props.handleChange(
                        "NumberOfKidsYouCanHandel"
                      )}
                      value={
                        props.touched.NumberOfKidsYouCanHandel &&
                        props.values.NumberOfKidsYouCanHandel
                      }
                      onBlur={props.handleBlur("NumberOfKidsYouCanHandel")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        marginRight: "10%",
                        borderColor: "#ffb028",
                      }}
                    ></Input>
                    {/* Handling test for numberOfKids   */}
                    <Text>
                      {" "}
                      {props.touched.NumberOfKidsYouCanHandel &&
                        props.errors.NumberOfKidsYouCanHandel}
                    </Text>

                    {/* Place input */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "50%",
                      }}
                    >
                      <Text> Where do you live ? </Text>
                      <Fontisto name="world-o" size={24} color="black" />
                    </View>
                    <Input
                      onChangeText={props.handleChange("Place")}
                      value={props.values.Place}
                      onBlur={props.handleBlur("Place")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        width: "80%",
                        borderColor: "#ffb028",

                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for place */}
                    <Text> {props.touched.Place && props.errors.Place} </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "25%",
                      }}
                    >
                      <Text> Please enter your Education Level </Text>
                      <Ionicons name="md-school" size={24} color="black" />
                    </View>
                    {/* EducationLevel input */}
                    <Input
                      onChangeText={props.handleChange("EducationLevel")}
                      value={props.values.EducationLevel}
                      onBlur={props.handleBlur("EducationLevel")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        borderColor: "#ffb028",

                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for education lvl */}
                    <Text>
                      {" "}
                      {props.touched.EducationLevel &&
                        props.errors.EducationLevel}{" "}
                    </Text>

                    {/* HowMannyHoursYouCanWorkADay input  */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "17%",
                      }}
                    >
                      <Text> How many hours you can work a day ? </Text>
                      <Entypo name="clock" size={24} color="black" />
                    </View>
                    <Input
                      onChangeText={props.handleChange(
                        "HowMannyHoursYouCanWorkADay"
                      )}
                      value={props.values.HowMannyHoursYouCanWorkADay}
                      onBlur={props.handleBlur("HowMannyHoursYouCanWorkADay")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        borderColor: "#ffb028",

                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for number of hours */}
                    <Text>
                      {props.touched.HowMannyHoursYouCanWorkADay &&
                        props.errors.HowMannyHoursYouCanWorkADay}{" "}
                    </Text>

                    {/* ExperensLevel input  */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "40%",
                      }}
                    >
                      <Text>What's your experens level ? </Text>
                    </View>
                    <Input
                      onChangeText={props.handleChange("ExperensLevel")}
                      value={props.values.ExperensLevel}
                      onBlur={props.handleBlur("ExperensLevel")}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        borderColor: "#ffb028",

                        marginRight: "10%",
                      }}
                    ></Input>
                    {/* Handling test for exp lvl */}
                    <Text>
                      {" "}
                      {props.touched.ExperensLevel &&
                        props.errors.ExperensLevel}{" "}
                    </Text>
                    <View
                      style={{
                        marginLeft: "25%",
                      }}
                    >
                      {/* submit bttn  */}

                      <View style={styles.alertcontainer}>
                        <TouchableOpacity
                          onPress={() => {
                            showAlertfun();
                          }}
                          style={{
                            width: "50%",
                            marginRight: "40%",
                          }}
                        >
                          <View style={styles.alertbutton}>
                            <Text style={styles.alerttext}>Send</Text>
                          </View>
                        </TouchableOpacity>

                        <AwesomeAlert
                          show={showAlert}
                          showProgress={false}
                          title="Nanny app "
                          message="You are trying to employ to nanny care company! you are responsable for the information that you send"
                          closeOnTouchOutside={true}
                          closeOnHardwareBackPress={true}
                          showCancelButton={true}
                          showConfirmButton={true}
                          cancelText="No, cancel"
                          confirmText="Yes, send my information "
                          confirmButtonColor="#DD6B55"
                          onCancelPressed={() => {
                            hideAlertfun();
                          }}
                          onConfirmPressed={props.handleSubmit}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  alertcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alertbutton: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffb028",

    backgroundColor: "rgba(255,225,225,0.3)",
  },
  alerttext: {
    color: "black",
    fontSize: 15,
    marginRight: "30%",
    justifyContent: "center",
  },
});
