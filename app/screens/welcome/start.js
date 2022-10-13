import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import Button from "../../element/Button";

export default function StartScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/img/bogota-4457796_1920.jpg")}
      style={styles.Imagen}
    >
      <View>
        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Iniciar Sesión
        </Button>
        <Button style={styles.btnStyle2}
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
    alignItems: "center",
    justifyContent: "center",
  },
  ViewContainer: {
    flex: 1,
    marginTop: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    alignItems: "center",
  },
  ViewBtn: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    color: "#212121",
  },
  descripcion: {
    textAlign: "center",
    marginBottom: 22,
    marginBottom: 30,
  },
  btnStyle1: {
    backgroundColor: "#E02A35",
    borderRadius: 50,
  },
  btnStyle2: {
    backgroundColor: "#cdcdcd",
    font_color:'black',
    borderRadius: 50,
  },
  Divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
