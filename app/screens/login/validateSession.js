import React, { useState, useEffect } from "react";
import { firebaseauth, authStateChanged } from "../../utils/dataBase/firabase";
import Loading from "../../core/Loading";
import { useNavigation } from "@react-navigation/native";
import NavigationApp from "../navigation/navigationTab/navigationApp";
import Home from "../welcome/home";

export default function ValidateSession() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    authStateChanged(firebaseauth, (user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Loading isVisible={true} text="Cargando..." />;

  return login ? <NavigationApp /> : <Home />;
}
