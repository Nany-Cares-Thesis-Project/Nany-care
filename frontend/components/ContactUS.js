import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ContactUS() {
  return (
    <View style={styles.container}>
      <Text>Send your email !!</Text>
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
