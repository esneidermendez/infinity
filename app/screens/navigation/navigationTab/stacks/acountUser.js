import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CerrarSesion from "../../../login/CerrarSesion";

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Acount"
        component={CerrarSesion}
        options={{ title: "Perfil" }}
      />
    </Stack.Navigator>
  );
}
