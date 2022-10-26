import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { firebaseauth, EmailAndPassword } from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/Validations";
import Loading from "../../core/Loading";

export default function LoginForm(props) {
  const { toasRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSummit = () => {
    if (formData.email.length == 0 || formData.password.length == 0) {
      Alert("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      console.log(formData.email);
      alert("El email no es correcto ");
    } else {
      setLoading(true);
      EmailAndPassword(firebaseauth, formData.email, formData.password)
        .then((userCredential) => {
          setLoading(false);
          console.log(userCredential);
          navigation.navigate("validateSession");
        })
        .catch(() => {
          setLoading(false);
          toasRef.current.show("Email o contraseña incorrectos");
        });
    }
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
      <Input
        placeholder="Contraseña"
        containerStyle={styles.InputFrom}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSummit}
      />
      <Loading isVisible={loading} text="Cargando..." />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  FormContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  InputFrom: {
    width: "100%",
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
