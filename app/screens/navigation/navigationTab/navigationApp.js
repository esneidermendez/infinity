import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import StationStatisticsStack from "./stacks/stationStatisticsStack";
import MapStack from "./stacks/mapStack";
import AcountUser from "./stacks/acountUser";
import AboutSRMTStack from "./stacks/aboutSRMTStack";

export default function NavigationApp() {
  const TabNavegacion = createBottomTabNavigator();

  return (
    <TabNavegacion.Navigator
      initialRouteName="MapStack"
      tabBarOptions={{
        inactiveTintColor: "#1A1A1A",
        activeTintColor: "#E02A35",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <TabNavegacion.Screen
        name="StationStatisticsStack"
        component={StationStatisticsStack}
        options={{
          title: "Estadisticas",
        }}
      />

      <TabNavegacion.Screen
        name="MapStack"
        component={MapStack}
        options={{ title: "Mapa" }}
      />

      <TabNavegacion.Screen
        name="AcountUser"
        component={AcountUser}
        options={{ title: "Perfil" }}
      />

      <TabNavegacion.Screen
        name="AboutSRMTStack"
        component={AboutSRMTStack}
        options={{ title: "S.R.M.T." }}
      />
    </TabNavegacion.Navigator>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "StationStatisticsStack":
      iconName = "subway";
      break;
    case "NewsStack":
      iconName = "compass-outline";
      break;
    case "MapStack":
      iconName = "google-maps";
      break;
    case "AcountUser":
      iconName = "account-circle-outline";
      break;
    case "AboutSRMTStack":
      iconName = "information-outline";
      break;
    default:
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
