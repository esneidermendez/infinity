import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AboutSRMT from "../../../about/aboutSRMT";

const Stack = createStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AboutSRMT"
        component={AboutSRMT}
        options={{
          title: "S.R.M.T.",
          headerTitleStyle: { marginLeft: 138 },
        }}
      />
    </Stack.Navigator>
  );
}
