import React, { useRef } from "react";
import Background from "../../element/Background";
import Logo from "../../element/Logo";
import Button from "../../element/Button";
import { Text, StyleSheet, View } from "react-native";
import LoginForm from "./loginForm";
import { Divider } from "react-native-elements";
/* import LoginFacebook from "./loginFacebook"; */

export default function Login({ navigation }) {
  const toasRef = useRef();
  return (
    <Background>
      <Logo />
      <View style={styles.ViewContainer}>
        <LoginForm toasRef={toasRef} />
        <CreateAccount />
      </View>
      <Divider />
      {/* <View>
        <LoginFacebook toasRef={toasRef} />
      </View> */}
    </Background>
  );
}
function CreateAccount({ navigation }) {
  return (
    <Text style={styles.txtRegister}>
      ¿Olvidaste tu contraseña?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("recover")}
      >
        Clic aquí {"\n \n"}
      </Text>
      ¿Aun no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Registrate
      </Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "35%",
    marginTop: "10%",
  },
  ViewContainer: {
    marginRight: "8%",
    marginLeft: "8%",
  },
  txtRegister: {
    marginTop: "38%",
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
