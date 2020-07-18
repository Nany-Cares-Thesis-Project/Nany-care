import * as React from "react";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import AboutUS from "./AboutsUS";
import ContactUS from "./ContactUS";
import { EducationLevel, HowManyKidsCanHandle, Place } from "./Home";

import Profile from "./profile";

function Profile1() {
  return <Profile />;
}

function Home1() {
  return (
    <View>
      <Place />
      <EducationLevel />
      <HowManyKidsCanHandle />
    </View>
  );
}
function LogOut() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Log Out Screen</Text>
    </View>
  );
}
function AboutUs() {
  return <AboutUS />;
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

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home1} />
      <Drawer.Screen name="Profile" component={Profile1} />
      <Drawer.Screen name="About US" component={AboutUs} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
      <Drawer.Screen name="LogOut" component={LogOut} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
