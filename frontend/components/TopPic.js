import React from "react";
import { View, Image } from "react-native";
import { StyleSheet, Text } from "react-native";
export default function TopPic() {
  return (
    <View style={{ flex: 1, width: 100 + "%", height: 100 + "%" }}>
      <View style={styles.tempNav}>
        <Text style={[styles.text, { fontWeight: "200", fontSize: 15 }]}>
          Nanny Care
        </Text>
      </View>

      <Image
        style={{ width: 100 + "%", height: 100, marginTop: 20 }}
        source={{
          uri:
            "https://images-na.ssl-images-amazon.com/images/I/71Q7VL1mpSL._SL1500_.jpg",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  text: {
    color: "#52575D",
  },

  tempNav: {
    marginTop: 90,
    width: 100 + "%",
    height: 56,
    marginTop: 20,
    backgroundColor: "rgb(250,250,250)",
    borderBottomColor: "rgb(233,233,223)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignContent: "center",
  },
});
