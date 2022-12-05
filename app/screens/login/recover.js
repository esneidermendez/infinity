import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import RecoverForm from "./recoverForms";

function Recover(props) {
  return (
    <View>
      <Image
        source={require("../../assets/img/logo_size.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.ViewForm}>
        <Text style={styles.txtRegister}>
          Para recuperar la contraseña debes indicar el correo electronico para
          enviarte la información de tu cuenta {"\n"}
        </Text>
        <RecoverForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "50%",
    height: "35%",
    marginLeft: "25%",
    marginRight: "25%",
    marginTop: "20%",
  },
  ViewForm: {
    marginRight: "8%",
    marginLeft: "8%",
  },
  txtRegister: {
    marginTop: "15%",
    marginLeft: "3%",
    marginRight: "3%",
    fontSize: 15,
    justifyContent: "center",
  },
});

export default Recover;
