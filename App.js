import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-native-paper";
import { theme } from "./app/core/theme";
import {
  HomeScreen,
  Permissions,
  StartScreen,
  Login,
  validateSession,
  navigationApp,
  ListNews,
  CreateNew,
  CloseSession,
  RegisterScreen,
  RegisterForm,
  Notification,
  Recover,
} from "./app/screens";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="validateSession"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Permissions" component={Permissions} />
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="validateSession" component={validateSession} />
          <Stack.Screen name="navigationApp" component={navigationApp} />
          <Stack.Screen name="ListNews" component={ListNews} />
          <Stack.Screen name="CreateNew" component={CreateNew} />
          <Stack.Screen name="CloseSession" component={CloseSession} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="RegisterForm" component={RegisterForm} />
          <Stack.Screen name="Notifications" component={Notification} />
          <Stack.Screen name="Recover" component={Recover} />
          {/*<Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
