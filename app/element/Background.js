import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { theme } from "../core/theme";

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require("../assets/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container: {
<<<<<<< HEAD
    height: '80%',
    marginTop: '10%',
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
=======
    height: "80%",
    marginTop: "10%",
    width: "100%",
    maxWidth: "100%",
    alignSelf: "center",
    alignItems: "center",
>>>>>>> 0bd8dd2534b7be6a9c293767ae747ed1a6a9661e
  },
});
