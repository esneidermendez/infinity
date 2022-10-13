import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListStations from "../../../stadistics/listStations";
import StationStatistics from "../../../stadistics/stationStatistics";

const Stack = createStackNavigator();

export default function StationStatisticsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListStations"
        component={ListStations}
        options={{
          title: "Lista de Estaciones",
        }}
      />

      <Stack.Screen
        name="StationStatistics"
        component={StationStatistics}
        options={{
          title: "Estadisticas",
        }}
      />
    </Stack.Navigator>
  );
}
