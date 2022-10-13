import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import closeSession from "../../../login/closeSession";
import { TabView } from "react-native-elements";

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Acount" component={closeSession} />
    </Stack.Navigator>
  );
}
