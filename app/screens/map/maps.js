import * as React from "react";
//import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import * as permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import { dbFirestore } from "../../utils/dataBase/firabase";
import { async } from "@firebase/util";

export default function Maps() {
  const [ubication, setUbication] = React.useState(null);
  const [station, setStation] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const statusPermissions =
        await Location.requestForegroundPermissionsAsync();
      if (statusPermissions.status !== "granted") {
        alert("Tienes que aceptar los permisos de localizacion");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setUbication({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const makerOnClick = (latitud, longitud) => {
    for (const index in station) {
      if (Object.hasOwnProperty.call(station, index)) {
        if (station[index].latitu === latitud) {
          const stationSelect = station[index];
          props.navigation.navigate("ListNews", { station: stationSelect });
        }
      }
    }
  };
  return (
    <View style={styles.ViewBody}>
      {ubication ? (
        <MapView
          style={styles.mapStyle}
          initialRegion={ubication}
          showsUserLocation={true}
          onRegionChange={(region) => setUbication(region)}
        ></MapView>
      ) : (
        console.log("")
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ViewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, width: 2 },
    shadowOpacity: 0.5,
  },
  mapStyle: {
    marginBottom: "10%",
    width: "100%",
    height: "100%",
  },
});
