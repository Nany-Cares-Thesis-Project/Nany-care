import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

const Home = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="3" value="java" />
        <Picker.Item label="Kids can handle" value="js" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Name" value="java" />
        <Picker.Item label="Kids can handle" value="js" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});

export default Home;
