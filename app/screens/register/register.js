import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "./registerForm";

function Register() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/img/logo_size.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.ViewForm}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 180,
    marginTop: 20,
  },
  ViewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});

export default Register;
