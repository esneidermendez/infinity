import React from "react";
import * as Location from "expo-location";
import Background from "../../element/Background";
import Scroll from "../../element/Scroll";
import Header from "../../element/Header";
import Button from "../../element/Button";
import Paragraph from "../../element/Paragraph";
import * as permissions from "expo-permissions";

export default function Permissions({ navigation }) {
  const pLocation = () => {
    (async () => {
      const resultPermissions =
        await Location.requestForegroundPermissionsAsync();
      if (statusPermissions.status !== "granted") {
        alert("Tienes que aceptar los permisos de localizacion", 3000);
        return;
      }
    })();
  };
  const pCamera = () => {
    (async () => {
      const resultPermiCamera = await permissions.askAsync(
        permissions.CAMERA_ROLL
      );
    })();
  };
  const onClick = () => {
    pLocation();
    pCamera();
    navigation.navigate("Start");
  };
  return (
    <Background>
      <Scroll />
      <Header>Permisos de la aplicación</Header>
      <Paragraph>
        Para mejorar el funcionamiento del aplicativo requerimos algunos
        permisos sobre este dispositivo
      </Paragraph>
      <Button onPress={() => onClick()}>Siguiente</Button>
    </Background>
  );
}
