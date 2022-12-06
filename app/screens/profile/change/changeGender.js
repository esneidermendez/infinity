import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import {
  firebaseauth,
  db,
  doc,
  dbSetDoc,
} from "../../../utils/dataBase/firabase";

export default function ChangeGender(props) {
  // Estados
  const { gender, uid, setshowModal, setLoading, setLoadingText } = props;
  const [error, setError] = useState({});
  const [Usu, setUsu] = useState({
    UserID: "",
    Gender: "",
  });

  const onSummit = () => {
    setLoadingText("Actualizando Genero");
    setLoading(true);
    const dbRef = doc(db, "User", firebaseauth.currentUser.uid);
    dbSetDoc(
      dbRef,
      {
        Gender: Usu.Gender,
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
  };

  const radioButtons = (name, value) => {
    setUsu({ ...Usu, [name]: value });
  };

  const Datos = [
    { label: "Hombre  ", value: 0 },
    { label: "Mujer  ", value: 1 },
    { label: "Otro  ", value: 2 },
  ];
  //Vista
  return (
    <View style={style.view}>
      <Text style={style.text}>Genero</Text>
      <RadioForm
        radio_props={Datos}
        initial={gender}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={"#E02A35"}
        onPress={(value) => radioButtons("Gender", Datos[value].label)}
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

// Styles

const style = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    color: "#9e9e9e",
    marginBottom: "5%",
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
