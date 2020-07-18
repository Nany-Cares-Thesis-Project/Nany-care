import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TopPic from "./TopPic";
export default function Profile() {
  const [isError, setIsError] = useState(false);
  // fetching data from server side
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axios.get("http://localhost:5000/userProf");
        // result.data.map((item) => {
        //   setSelectedValue(item.place);
        console.log(result);
        // });
      } catch (error) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPic />
        <View style={styles.titleBar}>
          <AntDesign name="menufold" size={24} color="black" />
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../assets/profile-pic.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>

            <View style={styles.active}></View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              <AntDesign name="user" size={24} color="black" />
              Julie
            </Text>
            <View>
              <Text></Text>
            </View>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              <AntDesign name="mail" size={20} color="black" />
              Julie@gmail.com
            </Text>
            <View>
              <Text></Text>
            </View>
            <Text>
              <AntDesign name="phone" size={24} color="black" />
              0775177216
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },

  profileImage: {
    marginTop: 90,
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },

  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
