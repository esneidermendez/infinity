import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../../../map/maps";

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Map"
        component={Map}
        screenOptions={{ tabBarShowLabel: "False" }}
      />
    </Stack.Navigator>
  );
}
