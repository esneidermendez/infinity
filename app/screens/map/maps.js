import * as React from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import * as permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import {
  db,
  collection,
  getDocs,
  doc,
  query,
  onSnapshot,
} from "../../utils/dataBase/firabase";
import ThemedDialog from "react-native-elements/dist/dialog/Dialog";
// import { useNavigation } from "@react-navigation/native";
export default class Maps extends React.Component {
  totalDatos = 0;
  constructor(props) {
    super(props);
    this.state = {
      ubication: null,
      station: [],
      allNews: null,
    };
  }

  componentDidMount() {
    this.permissions();
    this.allNewsforstation();
    if ((this.state.allNews = !null)) {
      this.station();
    }
  }

  permissions = async () => {
    const statusPermissions =
      await Location.requestForegroundPermissionsAsync();
    if (statusPermissions.status !== "granted") {
      alert("Tienes que aceptar los permisos de localizacion");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    this.setState({
      ubication: {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
    });
  };

  allNewsforstation = async () => {
    let newInd = 0;
    let i = 0;

    const querySnapshot = await getDocs(collection(db, "Stations"));
    querySnapshot.forEach(async (docs) => {
      const docRef = doc(db, "News", docs.id);
      const q = await query(collection(docRef, "NewsStation"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        i = i + 1;
        const datosquery = snapshot.docs.length;
        newInd = newInd + datosquery;
        this.totalDatos = newInd;
        if (querySnapshot.docs.length === i) {
          this.setState({
            allNews: this.totalDatos,
          });
        }
      });
    });
  };
  station = async () => {
    let resultStation = [];
    let datosquerys = 0;
    let porcen;

    const querySnapshot = await getDocs(collection(db, "Stations"));
    querySnapshot.forEach((docs) => {
      let Station = docs.data();
      Station.id = docs.id;

      const docRef = doc(db, "News", Station.id);
      const q = query(collection(docRef, "NewsStation"));

      const unsubscribe = onSnapshot(q, (snapshots) => {
        datosquerys = snapshots.docs.length;
        porcen = (datosquerys * 100) / this.state.allNews;

        if (
          (porcen > 0 && porcen <= 30) ||
          (this.state.allNews >= 0 && this.state.allNews <= 5)
        ) {
          Station.risk = 1;
          Station.img = require("../../assets/img/triangulo_verde.png");
        }
        if (porcen >= 31 && porcen <= 60 && this.state.allNews > 5) {
          Station.risk = 2;
          Station.img = require("../../assets/img/triangulo_amarillo.png");
        }
        if (porcen >= 61 && porcen <= 100 && this.state.allNews > 5) {
          Station.risk = 3;
          Station.img = require("../../assets/img/triangulo_rojo.png");
        }
        resultStation.push(Station);
      });
    });
    this.setState({ station: resultStation });
  };

  makerOnClick = (latitud, longitud) => {
    for (let index in this.state.station) {
      if (Object.hasOwnProperty.call(this.state.station, index)) {
        if (this.state.station[index].latitu === latitud) {
          const stationSelect = this.state.station[index];
          this.props.navigation.navigate("ListNews", {
            station: stationSelect,
          });
        }
      }
    }
  };

  render() {
    return (
      <View style={styles.ViewBody}>
        {this.state.ubication ? (
          <MapView
            apiKey={"AIzaSyC59x4-b9fJOkMLKptMAKrCIkAW1_tph80"}
            style={styles.mapStyle}
            initialRegion={this.state.ubication}
            showsUserLocation={true}
            onRegionChange={(region) => this.setState({ ubication: region })}
          >
            {this.state.station.map((markers) => (
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
                  this.makerOnClick(
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
