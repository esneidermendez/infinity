import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

function CerrarSesion() {
  return <View></View>;
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    borderWidth: 3,
    width: 200,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  tinyLogo: {
    width: 350,
    height: 350,
  },
  contenedor: {
    backgroundColor: "white",
    height: "100%",
  },
});

export default CerrarSesion;
