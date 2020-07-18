import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function AboutUS() {
  return (
    <View style={styles.container}>
      <View>
        <AntDesign name="heart" size={24} color="black" />
        <AntDesign name="heart" size={24} color="black" />
      </View>
      <Text>Nany App Love you !!</Text>
      <AntDesign name="heart" size={24} color="black" />
      <AntDesign name="heart" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    marginTop: 70 + "%",
    marginRight: 25 + "%",
    marginLeft: 25 + "%",
  },
  text: {
    marginTop: 70 + "%",
    marginRight: 25 + "%",
    color: "#52575D",
  },
});
