import React from "react";
import Background from "../../element/Background";
import ImagenHome from "../../element/ImagenHome";
import Header from "../../element/Header";
import Button from "../../element/Button";
import Paragraph from "../../element/Paragraph";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Background>
      <ImagenHome />
      <Header>Bienvenido a tu App S.R.M.T.</Header>
      <Paragraph>
        Disfruta de consejos para el uso diario de Transmilenio y estadísticas
        sobre reportes en tiempo real
      </Paragraph>
      <Button onPress={() => navigation.navigate("Permissions")}>
        Siguiente
      </Button>
    </Background>
  );
}
