import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { firebaseauth, updatePass } from "../../../utils/dataBase/firabase";
import { reauthenticate } from "../../../utils/dataBase/api";
import { size } from "lodash";

export default function ChangePassword(props) {
  // Estados
  const { email, setshowModal, setLoading, setLoadingText } = props;
  const [error, setError] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showRepNewPassword, setshowRepNewPassword] = useState(false);
  const [newPassword, setnewPassword] = useState(defaultValue());

  //Funciones
  const onChange = (e, type) => {
    setnewPassword({ ...newPassword, [type]: e.nativeEvent.text });
  };

  const onSummit = () => {
    let isSetErrors = true;
    let errorsTemp = {};
    setError({});
    if (
      !newPassword.password ||
      !newPassword.newPassword ||
      !newPassword.RnewPassword
    ) {
      errorsTemp = {
        password: !newPassword.password ? "El campo no puede estar vacio" : "",
        newPassword: !newPassword.newPassword
          ? "El campo no puede estar vacio"
          : "",
        RepNewpassword: !newPassword.RnewPassword
          ? "El campo no puede estar vacio"
          : "",
      };
    } else if (newPassword.newPassword !== newPassword.RnewPassword) {
      errorsTemp = {
        newPassword: "Las contraseña no coninciden",
        RepNewpassword: "Las contraseña no coninciden",
      };
    } else if (size(newPassword.newPassword) < 6) {
      errorsTemp = {
        newPassword: "Las contraseña tiene que ser mayor a 6 caracteres",
        RepNewpassword: "Las contraseña tiene que ser mayor a 6 caracteres",
      };
    } else {
      setLoading(true);
      setLoadingText("Actualizando Contraseña");
      reauthenticate(newPassword.password)
        .then((response) => {
          updatePass(firebaseauth.currentUser, newPassword.newPassword)
            .then(() => {
              isSetErrors = false;
              setLoading(false);
              setshowModal(false);
              firebaseauth.signOut();
            })
            .catch(() => {
              setError({ email: "Error al actualizar la contraseña" });
              setLoading(false);
            });
        })
        .catch(() => {
          setLoading(false);
          setError({
            password: "La contraseña Actual no es correcta",
          });
        });
    }
    isSetErrors && setError(errorsTemp);
  };

  //Vista
  return (
    <View style={style.view}>
      <Text style={style.text}>Contraseña</Text>
      <Input
        placeholder="Contraseña Actual"
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
      <Input
        placeholder="Nueva Contraseña"
        containerStyle={style.input}
        password={true}
        secureTextEntry={showNewPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showNewPassword ? "eye-off-outline" : "eye-outline",
          color: "#9e9e9e",
          onPress: () => setshowNewPassword(!showNewPassword),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder="Repetir nueva Contraseña"
        containerStyle={style.input}
        password={true}
        secureTextEntry={showRepNewPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showRepNewPassword ? "eye-off-outline" : "eye-outline",
          color: "#9e9e9e",
          onPress: () => setshowRepNewPassword(!showRepNewPassword),
        }}
        onChange={(e) => onChange(e, "RnewPassword")}
        errorMessage={error.RepNewpassword}
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
    password: "",
    newPassword: "",
    RnewPassword: "",
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
