import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
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
              onPress={() =>
                navigation.navigate("StationStatistics", {
                  stationId: stationSelect,
                })
              }
            >
              <ListItem key={item.id}>
                <ListItem.Title style={{ marginLeft: 25 }}>
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
