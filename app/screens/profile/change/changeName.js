import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import {
  firebaseauth,
  updateProfil,
  db,
  doc,
  dbSetDoc,
  collection,
} from "../../../utils/dataBase/firabase";

export default function ChangeName(props) {
  // Estados
  const { displayName, uid, setshowModal, setLoading, setLoadingText } = props;
  const [error, setError] = useState({});
  const [newUsuName, setnewUsuName] = useState(defaultValue());

  //Funciones
  const onChange = (e, type) => {
    setnewUsuName({ ...newUsuName, [type]: e.nativeEvent.text });
  };

  const onSummit = () => {
    setError(null);
    if (!newUsuName.name) {
      setError({ ["Name"]: "El nombre no puede estar vacio" });
    } else if (displayName === newUsuName.name) {
      setError({ ["Name"]: "El nombre no puede ser igual al actual" });
    } else {
      setLoadingText("Actualizando Nombre");
      setLoading(true);
      const update = {
        displayName: newUsuName.name,
      };
      updateProfil(firebaseauth.currentUser, update)
        .then(() => {
          const dbRef = doc(db, "User", firebaseauth.currentUser.uid);
          console.log(dbRef);
          dbSetDoc(
            dbRef,
            {
              displayName: newUsuName.name,
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
    }
  };

  //Vista
  return (
    <View style={style.view}>
      <Text style={style.text}>Nombres y Apellidos</Text>
      <Input
        placeholder="Nombre Completo"
        containerStyle={style.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#9e9e9e",
        }}
        defaultValue={displayName && displayName}
        onChange={(e) => onChange(e, "name")}
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
    name: "",
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
