import React, { useRef } from "react";
import Background from "../../element/Background";
import Logo from "../../element/Logo";
import Button from "../../element/Button";
import { Text, StyleSheet, View, Image } from "react-native";
import LoginForm from "./loginForm";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginFacebook from "./loginFacebook";

export default function Login() {
  const navigation = useNavigation();
  const toasRef = useRef();
  return (
    <Background>
      <Image
        source={require("../../assets/img/logo_size.png")}
        style={styles.logo}
      />
      <View style={styles.ViewContainer}>
        <LoginForm toasRef={toasRef} />
        <Divider />
        <View style={styles.FaceContainer}>
          <LoginFacebook toasRef={toasRef} />
        </View>

        <CreateAccount />
      </View>
    </Background>
  );
  function CreateAccount() {
    return (
      <Text style={styles.txtRegister}>
        ¿Olvidaste tu contraseña?{" "}
        <Text
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Recover")}
        >
          Clic aquí {"\n \n"}
        </Text>
        ¿Aun no tienes una cuenta?{" "}
        <Text
          style={styles.btnRegister}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          Registrate
        </Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "10%",
    height: "35%",
  },
  FaceContainer: {
    marginTop: "10%",
  },
  logo: {
    width: "50%",
    height: "35%",
    marginTop: "10%",
  },
  ViewContainer: {
    marginRight: "8%",
    marginLeft: "8%",
  },
  txtRegister: {
    marginTop: "10%",
    marginLeft: "3%",
    marginRight: "3%",
  },
  btnRegister: {
    color: "#E02A35",
    fontWeight: "bold",
  },
  Divider: {
    backgroundColor: "#9e9e9e",
    margin: 40,
    marginTop: "5%",
    marginEnd: "0.1%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "0.1%",
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
});
