import React, { useState, useEffect } from "react";
//import jwt_decode from "jwt-decode";
import { Text } from "galio-framework";
import axios from "axios";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

export default function Profile() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // axios.get("http://192.168.127.43:5000/profile").then((res) => {
    //   // console.log(res, "this is res");
    //   AsyncStorage.getItem("token").then((res) => {
    //     // console.log(res.data, "Hi");
    //   });
    //   // console.log(res.data, "hellllllllo");

    //   setUserData(res.data);
    // }, {});
    // // console.log(Object.Values(userData[0]), "u");
    // console.log(userData, "uuu");
    fetch(`http://192.168.127.43:5000/profile`)
      .then((res) => res.json())
      .then((response) => {
        AsyncStorage.getItem("token").then((res) => {
          // console.log(res.data, "Hi");
        });
        console.log(response[0].name, "here");
        setUserData(response[0]);
        userData.name = response[0].name;
        userData.email = response[0].email;
        userData.image = response[0].image;
        userData.phoneNumber = response[0].phoneNumber;
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios.get("http://172.16.0.161:5000/profile").then((res) => {
      AsyncStorage.getItem("token").then((res) => {
        console.log(res.data);
      });
      setUserData(res.data);
    }, {});
    console.log(userData);
  });
  return (
    <ImageBackground
      source={{
        uri: userData.image,
      }}
      style={{ width: "100%", height: "100%" }}
      imageStyle={{ opacity: 0.3 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri: userData.image,
              }}
              style={{ width: 200, height: 200 }}
              // resizeMode="center"
            ></Image>
          </View>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {"\n"}
            <AntDesign name="user" size={33} color="black" />: {userData.name}
          </Text>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontSize: 17 }]}>
              {"\n"}
              <AntDesign name="mail" size={20} color="black" />:{" "}
              {userData.email}
            </Text>
            <Text size={20} color="black">
              {"\n"}
              {"\n"}
              <AntDesign name="phone" size={24} color="black" />:{" "}
              {userData.phoneNumber}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  text: {
    color: "#52575D",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  profileImage: {
    marginTop: 50,
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 15,
    borderColor: "rgba(255,255,255,0.4)",
    overflow: "hidden",
    marginLeft: "10%",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 60,
  },
  icon: {
    marginRight: "10px",
  },
});
