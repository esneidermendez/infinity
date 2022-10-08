import React from "react";
import { Image, StyleSheet } from "react-native";
import Background from "./Background";

export default function Logo() {
  return (
    <Image
      source={require("../assets/img/logo_size.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: "25%",
    marginTop: "10%",
    marginEnd: "10%",
  },
});
