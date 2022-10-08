import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  SafeAreaView,
} from "react-native";

function AboutSRMT() {
  return (
    <ScrollView style={styles.scrollView}>
      <Image
        source={require("../../assets/img/logo_size.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.Text}>
        S.R.M.T. es una aplicación diseñada por alumnos de la Universidad
        Manuela Beltran como proyecto de grado, esta aplicación tiene como fin
        aportar a la sociedad un sistema en el cual se pueda validar o verificar
        el estado de riesgo de robo en las estaciones de transmilenio en la
        ciudad de Bogota.
      </Text>
      <Text style={styles.Text}>
        Esta aplicación es de codigo abierto asi que esta sujeta a cambios
      </Text>
      <Text style={styles.Text}>
        Derechos reservado a la Universidad Manuela Beltran
      </Text>
      <Image
        source={require("../../assets/img/Escudo_UMB.png")}
        resizeMode="contain"
        style={styles.logoUMB}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
    width: "100%",
  },
  logo: {
    width: "100%",
    height: 200,
    marginTop: 10,
    alignItems: "center",
  },
  Text: {
    textAlign: "justify",
    marginLeft: 50,
    marginRight: 50,
    fontWeight: "bold",
  },
  logoUMB: {
    width: "100%",
    marginTop: 40,
    height: 100,
    alignItems: "center",
  },
});
export default AboutSRMT;
