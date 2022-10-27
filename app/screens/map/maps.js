import * as React from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import * as permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import { db, collection, getDocs } from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";

export default function Maps() {
  const navigation = useNavigation();
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

  React.useEffect(() => {
    (async () => {
      const resultStation = [];
      const querySnapshot = await getDocs(collection(db, "Stations"));
      querySnapshot.forEach((doc) => {
        const Station = doc.data();
        Station.id = doc.id;
        if (Station.risk === 1) {
          Station.img = require("../../assets/img/triangulo_verde.png");
        }
        if (Station.risk === 2) {
          Station.img = require("../../assets/img/triangulo_amarillo.png");
        }
        if (Station.risk === 3) {
          Station.img = require("../../assets/img/triangulo_rojo.png");
        }
        resultStation.push(Station);
      });
      setStation(resultStation);
    })();
  }, []);

  const makerOnClick = (latitud, longitud) => {
    for (const index in station) {
      if (Object.hasOwnProperty.call(station, index)) {
        if (station[index].latitu === latitud) {
          const stationSelect = station[index];
          navigation.navigate("ListNews", { station: stationSelect });
        }
      }
    }
  };

  return (
    <View style={styles.ViewBody}>
      {ubication ? (
        <MapView
          apiKey={"AIzaSyC59x4-b9fJOkMLKptMAKrCIkAW1_tph80"}
          style={styles.mapStyle}
          initialRegion={ubication}
          showsUserLocation={true}
          onRegionChange={(region) => setUbication(region)}
        >
          {station.map((markers) => (
            <Marker
              key={markers.id}
              coordinate={{
                latitude: Number(markers.latitu),
                longitude: Number(markers.length),
              }}
              title={markers.name}
              description={markers.descrip}
              image={markers.img}
              onPress={(value) =>
                makerOnClick(
                  value.nativeEvent.coordinate.latitude,
                  value.nativeEvent.coordinate.longitude
                )
              }
            ></Marker>
          ))}
        </MapView>
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
