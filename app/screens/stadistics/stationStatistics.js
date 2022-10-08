import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

/*import { VictoryPie } from "victory-native";*/

function StationStatistics() {
  return <View></View>;
}

const styles = StyleSheet.create({
  contenedora: {
    padding: 10,
  },
  button: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#5A3D28",
    width: 300,
    borderRadius: 10,
    margin: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
});

export default StationStatistics;
