import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListStations from "../../../stadistics/listStations";
import StationStatistics from "../../../stadistics/stationStatistics";

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ListStations"
        component={ListStations}
        options={{ title: "Estadisticas" }}
      />

      <Stack.Screen
        name="StationStatistics"
        component={StationStatistics}
        options={{ title: "Estadisticas" }}
      />
    </Stack.Navigator>
  );
}
