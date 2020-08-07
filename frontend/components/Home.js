import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Picker,
  ScrollView,
  Icon,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Actions } from "react-native-router-flux";
import { Card } from "galio-framework";

import Payment from "./payment";
import ContactUS from "./ContactUS";
import AllNany from "./Home";
import Profile from "./profile";
import MapScreen from "./map";
import Logout from "./Logout";
import Confirm from "./Confirmation";
import { AsyncStorage } from "react-native";

const image = {
  uri:
    "https://cdn.kinsights.com/cache/a3/5d/a35d9ef62daa9876a5598868592d316c.jpg",
};
// import { TokenPage, TokenList } from "twilio/lib/rest/api/v2010/account/token";
function Profile1() {
  return <Profile />;
}

function Home1() {
  return <AllNany />;
}
function Logout1() {
  return <Logout />;
}
function Map1() {
  return <MapScreen />;
}

function ContactUs() {
  return <ContactUS />;
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();
function MyDrawer({ navigation }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={function AllNany({ navigation }) {
            // function to render results based on selected category
            // states to use
            const [nanylist, setNanylist] = useState([]); // state to hold all nanny records data
            const [selectedCity, setSelectedCity] = useState([]); // state to change the selected place based on picker selection
            const [selectedKids, setSelectedKids] = useState([]); // state to change the selected Kids number based on picker selection
            const [selectedEdu, setSelectedEdu] = useState([]); // state to change the selected education level based on picker selection
            const [selected, setSelected] = useState([]); // state to save all selected nannies based on selection

            //fetching data from the db
            useEffect(() => {
              fetch(`http://192.168.127.105:5000/ret`)
                .then((res) => res.json())
                .then((response) => {
                  setNanylist(response);
                })
                .catch((error) => console.log(error));
            }, []);

            // filtering the list data
            function listFilter() {
              if (selectedCity === "allNany") {
                setSelected(nanylist);
              } else {
                var selected1;
                selected1 = nanylist.filter((op) => {
                  return (
                    op["place"] === selectedCity &&
                    op["educationLevel"] === selectedEdu &&
                    op["kidsNumber"] === selectedKids
                  );
                });
                setSelected(selected1);
              }
            }

            function nannyReserved(nany) {
              // function to reserve the nanny called once the reserve button clicked

              axios
                .post(`http://192.168.127.105:5000/reserve`, nany)
                .then((res) => res)
                .then((data) => {
                  //saving nanny info into AsyncStorage
                  AsyncStorage.setItem("nany", JSON.stringify(nany));
                  // getting user token value + Nanny info
                  AsyncStorage.multiGet(["token", "nany"]).then((res) => {
                    console.log(res);
                  });
                })
                .then(() => {
                  Actions.push("MapScreen");
                })

                .catch((err) => console.log(err));
            }

            return (
              <ImageBackground
                source={image}
                style={styles.image}
                imageStyle={{ opacity: 0.1 }}
              >
                <View>
                  <ScrollView>
                    {/* city picker */}

                    <Text style={{ marginRight: "35%", marginBottom: "5%" }}>
                      {" "}
                      Where do you live?
                    </Text>

                    <Picker
                      selectedValue={selectedCity}
                      mode="dropdown"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        marginRight: "10%",
                        marginBottom: "10%",
                        borderColor: "#ffb028",
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedCity(itemValue);
                      }}
                    >
                      <Picker.Item label="All Cities" value="allNany" />
                      <Picker.Item label="Amman" value="Amman" />
                      <Picker.Item label="Irbed" value="Irbed" />
                      <Picker.Item label="Zarqa" value="Zarqa" />
                      <Picker.Item label="Aqaba" value="Aqaba" />
                    </Picker>

                    {/* Kids can handle picker */}
                    <Text style={{ marginRight: "30%", marginBottom: "5%" }}>
                      {" "}
                      How many kids you have{" "}
                    </Text>
                    <Picker
                      selectedValue={selectedKids}
                      mode="dropdown"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        borderColor: "#ffb028",

                        marginBottom: "10%",
                        marginRight: "10%",
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedKids(itemValue);
                      }}
                    >
                      <Picker.Item label="1 kid" value="1" />
                      <Picker.Item label="2 kids" value="2" />
                      <Picker.Item label="3 kids" value="3" />
                      <Picker.Item label="4 kids" value="4" />
                    </Picker>

                    {/* Education level picker */}
                    <Text style={{ marginRight: "10%", marginBottom: "5%" }}>
                      {" "}
                      Education level for the nanny you looking for{" "}
                    </Text>
                    <Picker
                      mode="dropdown"
                      selectedValue={selectedEdu}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: 5,
                        marginBottom: "10%",
                        borderColor: "#ffb028",

                        padding: 5,
                        width: "80%",
                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedEdu(itemValue);
                      }}
                    >
                      <Picker.Item label="College" value="college" />
                      <Picker.Item label="High school" value="high school" />
                    </Picker>
                    <View>
                      <Button
                        title="Submit"
                        mode="contained"
                        color="rgba(255,255,255,0.6)"
                        onPress={listFilter}
                      >
                        <Text style={{ color: "black" }}>Search </Text>
                        {"        "}
                        <FontAwesome name="search" size={24} color="black" />
                      </Button>
                    </View>

                    {/* rendering based on the selection condition */}
                    <View>
                      {selected.map((nany) => (
                        <>
                          <ScrollView style={{ width: "100%" }}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                marginBottom: "10%",
                                marginTop: "10%",
                              }}
                            >
                              <Card
                                flex
                                borderless
                                title={nany.name + "-" + nany.age + "Years old"}
                                caption={nany.cost + " JD /H"}
                                image={nany.image}
                                style={{ backgroundColor: "white" }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginLeft: "70%",
                                  }}
                                >
                                  <MaterialIcons
                                    name="place"
                                    size={24}
                                    color="black"
                                  />
                                  <Text>{nany.place}</Text>
                                </View>
                              </Card>
                              <View>
                                <Button
                                  title="Submit"
                                  mode="contained"
                                  color="rgba(255,255,255,0.6)"
                                  onPress={() => nannyReserved(nany)}
                                >
                                  <Text style={{ color: "black" }}>
                                    Reserve {nany.name}
                                  </Text>
                                </Button>
                              </View>
                            </View>
                          </ScrollView>
                        </>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </ImageBackground>
            );
          }}
        />

        <Drawer.Screen name="Profile" component={Profile1} />
        <Drawer.Screen name="Contact Us" component={ContactUs} />
        <Drawer.Screen name="Logout" component={Logout1} />
        {/* <Drawer.Screen name="Confirm" component={Confirm1} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default MyDrawer;

/*******************************Styling********************************/
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  boxContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "#151515",
  },
  description: {
    fontSize: 15,
    color: "#646464",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 20,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: "#FF1493",
  },
  profile: {
    backgroundColor: "#1E90FF",
  },
  message: {
    backgroundColor: "#228B22",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
