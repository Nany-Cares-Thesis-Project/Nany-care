import React, { useState, useEffect } from "react";
import { Card } from "galio-framework";
import { AsyncStorage } from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Confirm() {
  const [info, setInfo] = useState([]);
  const [value, onChangeText] = React.useState("0");
  const [total, setTotal] = useState("0");
  const [selectedLocation, setSelectedLocation] = useState({});
  var calculate;
  var onSubmit;


  useEffect(() => {//Retrieving user token, reserved nanny information and user location value from AsyncStorage
    try {
      
      AsyncStorage.multiGet(["token", "nany", "location"]).then((res) => {

        var nany = JSON.parse(res[1][1]);
        var location = JSON.parse(res[2][1]);
        setInfo(nany);
        setSelectedLocation(location);
      });
    } catch (error) {
      throw error;
    }
  }, []);

  // function to send user location and total cost to the nanny via SMS
  onSubmit = () => {
    axios
      .post("http://192.168.127.105:5000/sendSMS1", [
        selectedLocation,
        total,
        info,
      ])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  //Calculating total cost based on user input for how many hours he will reserve the nanny service
  calculate = function calculateTotal() {
    console.log(info.cost * value);
    var totalCost = info.cost * value;
    setTotal(totalCost);
    console.log(total, "to");
    alert("Your reservation done \n Your service costs: " + total);

  };

  return (
    <View>
      <>
        <View>
          {/* Card to display selected Nanny */}
          <Card
            title={info.name}
            caption={info.cost + "  JD  /H"}
            image={info.image}
            style={styles.card}
          >
            <View
              style={{
                flexDirection: "row",
                marginRight: "40%",
              }}
            >
              <MaterialIcons name="place" size={24} color="black" />
              <Text>{info.place}</Text>
            </View>
          </Card>
          <View>
            <View>
              <Text style={styles.text}>
                Enter how many hours you need our service
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeText(text)}
                value={value}
              ></TextInput>
            </View>

            <View>
              <Button
                mode="contained"
                color="rgba(255,255,255,0.6)"
                onPress={calculate}
              >
                <Text>Calculate total</Text>
              </Button>
            </View>
          </View>
          <View>
            <View>
              <Button
                title="Submit"
                mode="contained"
                color="rgba(255,255,255,0.6)"
                onPress={onSubmit}
              >
                <Text>Done</Text>
              </Button>
            </View>
            <View>
              <Button
                title="Submit"
                mode="contained"
                color="rgba(255,255,255,0.6)"
              >
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </View>
      </>
    </View>
  );
}


/*******************************Styling********************************/
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  card: {
    width: 300,
    height: 250,
    marginLeft: 55,
    marginTop: 100,
    fontSize: 20,
  },
  input: {
    textAlign: "center",
  },
  text: {
    marginTop: 30,
    textAlign: "center",
  },
});
