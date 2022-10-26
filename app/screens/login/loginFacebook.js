import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import {
  firebaseauth,
  FacebookAuthProvider,
  signInWithPopup,
} from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";
import { FacebookApi } from "../../utils/social";
import Loading from "../../core/Loading";

export default function LoginFacebook(props) {
  const { toastRef } = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const provider = new FacebookAuthProvider();

  const login = async () => {
    provider.setCustomParameters({
      display: "popup",
    });

    await signInWithPopup(firebaseauth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        signInWithRedirect(firebaseauth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </>
  );
}
