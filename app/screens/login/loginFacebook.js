import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FacebookApi } from "../../utils/social";
import * as Facebook from "expo-facebook";
import Loading from "../../core/Loading";
import { signInWithCredential } from "../../utils/dataBase/firabase";
import { async } from "@firebase/util";

export default function LoginFacebook(props) {
  const { toastRef } = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const facebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "742830203265105",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        setLoading(true);
        const credentials = token;
        signInWithCredential(credentials)
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            toastRef.current.show("Credenciales incorrectas.");
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={facebookLogin}
      />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </>
  );
}
