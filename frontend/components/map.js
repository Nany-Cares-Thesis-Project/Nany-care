import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen(props) {
  const [selectedLocation, setSelectedLocation] = useState({
     latitude: 0,
    longitude: 0,
    coordinates: []
  });

  const mapRegion = {
    latitude: 31.963158,
    longitude: 35.930359,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  Geolocation.getCurrentPosition(
    position => { 
      setSelectedLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      coordinates: this.state.coordinates.concat({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
      })
      })

    }
  )
  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
