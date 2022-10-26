import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db, collection, getDocs, doc } from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";

export default function ListStations() {
  const [station, setStation] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    consultarStations();
  }, []);

  const consultarStations = () => {
    (async () => {
      const resultStation = [];

      const docSnap = await getDocs(collection(db, "Stations"));

      docSnap.forEach((doc) => {
        const stations = doc.data();
        stations.id = doc.id;
        resultStation.push(stations);
      });
      setStation(resultStation);
    })();
  };

  return (
    <View>
      <FlatList
        data={station}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const stationSelect = item.id;
          return (
            <TouchableOpacity
              style={{
                margin: 3,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: "#000000",
                padding: 1,
              }}
              onPress={() =>
                navigation.navigate("StationStatistics", {
                  stationId: stationSelect,
                })
              }
            >
              <ListItem
                key={item.id}
                style={{
                  margin: 1,
                  padding: 2,
                  borderColor: "#000000",
                }}
              >
                <Avatar
                  rounded
                  size="large"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={require("../../assets/img/logo_size.jpg")}
                />

                <ListItem.Title style={{ margin: 2, fontSize: 16 }}>
                  {item.name}
                </ListItem.Title>
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
