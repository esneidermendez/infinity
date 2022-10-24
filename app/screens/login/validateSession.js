import React, { useState, useEffect } from "react";
import { firebaseauth, authStateChanged } from "../../utils/dataBase/firabase";
import Loading from "../../core/Loading";
import { useNavigation } from "@react-navigation/native";
import NavigationApp from "../navigation/navigationTab/navigationApp";
import Notification from "../../element/notification";
import Home from "../welcome/home";

export default function ValidateSession() {
  const navigation = useNavigation();
  const [login, setLogin] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    authStateChanged(firebaseauth, (user) => {
      !user ? setLogin(false) : setLogin(true), setStatus(true);
    });
  }, []);

  if (login === null) return <Loading isVisible={true} text="Cargando..." />;

  if (login) {
    if (status === null) {
      navigation.navigate("Notifications", {
        title: "¡¡¡TEN PRESENTE!!!",
        body:
          "Si vas a usar el transporte publico recuerda" +
          "1. Guarda tus pertenencias de valor 📱👝💍💻" +
          "2. Procura tener siempre contacto con tus pertenecias" +
          "3. No saques el celular si el bus tiene las puertas abiertas",
        seconds: 2,
        program: "validateSession",
      });
    }

    return <NavigationApp />;
  }

  return <Home />;
  //return login ? <NavigationApp /> : <Home />;
}
