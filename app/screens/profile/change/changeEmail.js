import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import {
  firebaseauth,
  UpdateEmail,
  db,
  doc,
  dbSetDoc,
} from "../../../utils/dataBase/firabase.js";
import { reauthenticate } from "../../../utils/dataBase/api";
import { validateEmail } from "../../../utils/Validations";

function ChangeEmail(props) {
  // Estados
  const { email, uid, setshowModal, toastRef, setLoading, setLoadingText } =
    props;
  const [error, setError] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const [newEmail, setnewEmail] = useState(defaultValue());

  //Funciones
  const onChange = (e, type) => {
    setnewEmail({ ...newEmail, [type]: e.nativeEvent.text });
  };

  const onSummit = () => {
    setError({});
    if (!newEmail.email || email === newEmail.email) {
      alert("El correo no ha cambiado");
    } else if (!validateEmail(newEmail.email)) {
      alert("Correo incorrecto");
    } else if (!newEmail.password) {
      alert("La contraseña no puede estar vacia");
    } else {
      setLoading(true);
      setLoadingText("Actualizando Correo Electronico");
      reauthenticate(newEmail.password)
        .then((response) => {
          UpdateEmail(firebaseauth.currentUser, newEmail.email)
            .then(() => {
              const dbRef = doc(db, "User", firebaseauth.currentUser.uid);
              dbSetDoc(
                dbRef,
                {
                  Email: newEmail.email,
                },
                { merge: true }
              )
                .then((data) => {
                  setLoading(false);
                  setshowModal(false);
                })
                .catch(() => {
                  setLoading(false);
                });
            })
            .catch(() => {
              alert("No se pudo actualizar la informacion");
              setLoading(false);
            });
        })
        .catch(() => {
          setLoading(false);
          setError({
            password: "La contraseña no es correcta",
          });
        });
    }
  };

  //Vista
  return (
    <View style={style.view}>
      <Text style={style.text}>Correo Electronico</Text>
      <Input
        placeholder="Correo Electronico"
        containerStyle={style.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#9e9e9e",
        }}
        defaultValue={email && email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={error.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={style.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#9e9e9e",
          onPress: () => setshowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={error.password}
      />
      <Button
        title="Guardar"
        containerStyle={style.btnContainer}
        buttonStyle={style.btnGuardar}
        onPress={onSummit}
      />
    </View>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

// Styles

const style = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    color: "#9e9e9e",
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    paddingTop: 20,
    width: "95%",
    alignItems: "center",
  },
  btnGuardar: {
    backgroundColor: "#E02A35",
    width: 150,
    borderRadius: 50,
  },
});

export default ChangeEmail;
