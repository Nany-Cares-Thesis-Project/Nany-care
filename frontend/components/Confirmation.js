import React, { useState } from "react";
import { Card } from "galio-framework";
import { AsyncStorage } from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import * as Location from "expo-location";
import { Notifications } from "expo";
import {
  Keyboard,
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";


const localNotification = {
  title: "Nany APP",
  body: "You send yor location successfully!!",
};

export default function Confirm() {
  const [info, setInfo] = useState([]);
  const [value, onChangeText] = React.useState('0');
  const [total, setTotal] = useState('0');
  
  const [userLocation, setUserLocation] = useState({coords: {
    accuracy: 20,
    altitude: 5,
    heading: 0,
    latitude: 37.4219983,
    longitude: -122.084,
    speed: 0,
  },
  mocked: false,
  timestamp: 1577294172000,
});



useEffect(() => {
      try {
      //Retrieving user token, reserved nanny information and user location value from AsyncStorage
     AsyncStorage.multiGet(['token','nany','location']).then((res) => {
      var nany =  JSON.parse(res[1][1]);
      var location =  JSON.parse(res[2][1]);
      setInfo(nany)
      setUserLocation(location)
      
      })
    }
    catch (error) {
       throw error
       }
     
      })
// function to send user location and total cost to the nanny via SMS

     const onSubmit = () => {
      axios
        .post("http://192.168.8.100:5000/sendSMS", userLocation, total)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      Keyboard.dismiss();
      const schedulingOptions = {
        time: new Date().getTime() + 1000,
      };
      // Notifications show only when app is not active.
      // (ie. another app being used or device's screen is locked)
      Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      );
    };
 


  //Calculating total cost based on user input for how many hours he will reserve the nanny service
  function calculateTotal(){
    console.log(info.cost*value)
    var totalCost = info.cost*value
    setTotal(totalCost)
    alert('Your reservation done \n Your service costs: '+total)
  }
  return (
    <View>
    <>
            <View >
                  
                <Card
                
                  title= {info.name}
                  caption= {info.cost + "$  /H"}
                  location={info.place}
                  image={info.image}
                  // style={{ backgroundColor: "white" }}
                  style={styles.card}
                />
                    <View >
                          <View >
                                <Text style ={styles.text}>
                                    Enter how many hours you need our service 
                                </Text>
                            <TextInput
                            style ={styles.input}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                            ></TextInput>
                          </View>

                          <View >
                                <Button
                                  mode="contained"
                                  color="rgba(255,255,255,0.6)"
                                  onPress={calculateTotal}
                                >
                                      <Text>
                                        Calculate total
                                      </Text>
                                </Button>
                          </View>
                  </View>
                  <View >
                          <View >
                                <Button
                                  title="Submit"
                                  mode="contained"
                                  color="rgba(255,255,255,0.6)"
                                  onPress={onSubmit}
                                >
                                      <Text>
                                        Done
                                      </Text>
                                </Button>
                          </View>
                          <View >
                                <Button
                                  title="Submit"
                                  mode="contained"
                                  color="rgba(255,255,255,0.6)"
                                
                                >
                                      <Text>
                                      Cancel
                                      </Text>
                                </Button>
                        </View>
                  </View>  
          </View>
      </>                    
  </View>
       
      
                       
  )

}
/*******************************Styling********************************/
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  card:{
    width: 300,
    height: 250,
   marginLeft: 55,
   marginTop: 100,
   fontSize: 20
  },
  input:{
    textAlign: "center",
  },
  text: {
    marginTop: 30,
    textAlign: "center"

  }


})
