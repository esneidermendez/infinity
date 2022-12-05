import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import {
  firebaseApp,
  firebaseauth,
  sendPasswordResetEmail,
} from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";

function RecoverForm(props) {
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();

  const sendEmail = () => {
    console.log(formData.email);
    sendPasswordResetEmail(firebaseauth, formData.email)
      .then(() => {
        alert(
          "Se envio un correo electronico a la bandeja de entra, por favor verificar"
        );
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.FormContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.InputFrom}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <View>
        <Button
          title={"Recuperar contraseña"}
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnLogin}
          onPress={sendEmail}
        />
      </View>
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
  };
}

const styles = StyleSheet.create({
  FormContainer: {
    alignContent: "center",
  },
  InputFrom: {
    width: "100%",
    marginTop: "3%",
  },
  btnContainerLogin: {
    width: "95%",
    alignItems: "center",
  },
  btnLogin: {
    backgroundColor: "#E02A35",
    width: 250,
    borderRadius: 50,
  },
  iconRight: {
    color: "#9e9e9e",
  },
});
export default RecoverForm;
