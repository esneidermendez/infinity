import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListNews from "../../../components/news/ListNews";

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListNews"
        component={ListNews}
        options={{ title: "Noticias" }}
      />
    </Stack.Navigator>
  );
}
