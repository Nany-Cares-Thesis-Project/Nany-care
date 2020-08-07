import React, { useState, useEffect } from "react";
import { Keyboard, Platform, StyleSheet, View, Text } from "react-native";
import { Button } from "galio-framework";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import axios from "axios";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Actions } from "react-native-router-flux";

const localNotification = {
  title: "Nany APP",
  body: "You send yor location successfully!!",
};
const handleNotification = () => {
  console.warn("ok! got your notif");
};
const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === "granted")
    console.log("Notification permissions granted.");
};
export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState();
  const [location, setLocation] = useState({
    coords: {
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
  const [errorMsg, setErrorMsg] = useState(null);
  const onSubmit = (text) => {
    axios
      .post("http://192.168.127.43:5000/send", selectedLocation)
      .then(
        // console.log('fnh');
        Actions.push("Confirm")
      )
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
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        let userLocation = await Location.getCurrentPositionAsync({});
        console.log(JSON.stringify(userLocation));
        setLocation(userLocation);
      })();
    }
  }, []);
  var mapRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  const selectLocationHandler = (event) => {
    event.preventDefault();
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };
  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }
  if (selectedLocation) {
    mapRegion = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }
  useEffect(() => {
    askNotification();
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
  }, []);
  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {markerCoordinates && (
          <Marker title="Picked Location" coordinate={markerCoordinates} />
        )}
      </MapView>
      <View>
        <Button
          title="Next"
          mode="contained"
          Text="Next"
          size="large"
          color="rgba(255,255,255,0.6)"
          onPress={onSubmit}
        >
          <Text style={{ color: "black" }}>Next</Text>
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    top: 60 + "%",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rad: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0,122,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(0,122,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  mark: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "#007AFF",
  },
});
