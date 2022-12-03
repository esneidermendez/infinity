import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import Button from "../../element/Button";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../assets/img/bogota-4457796_1920.jpg")}
      style={styles.Imagen}
    >
      <View>
        <Button
          style={styles.btnStyle1}
          onPress={() => navigation.navigate("Login")}
        >
          Iniciar Sesión
        </Button>
        <Button
          style={styles.btnStyle2}
          mode="outlined"
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          Crear cuenta
        </Button>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  Imagen: {
    flex: 2,
    justifyContent: "center",
  },
  text: {
    color: "#212121",
  },
  btnStyle1: {
    backgroundColor: "#E02A35",
    borderRadius: 50,
    width: "60%",
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "20%",
    marginBottom: "5%",
  },
  btnStyle2: {
    backgroundColor: "#cdcdcd",
    font_color: "black",
    borderRadius: 50,
    marginLeft: "20%",
    marginRight: "20%",
    marginEnd: "20%",
    width: "60%",
  },
  Divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
