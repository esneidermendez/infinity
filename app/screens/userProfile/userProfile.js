import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import {
  storage,
  getDocs,
  collection,
  db,
} from "../../utils/dataBase/firabase";
import * as permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function UserProfile(props) {
  const {
    userInfo: { photoURL, displayName, email, uid },
    setLoading,
    setLoadingText,
  } = props;

  const updatePhotoUrl = () => {
    firebase.firebaseApp
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.firebaseauth.currentUser.updateProfile(update);
        setLoading(false);
        toasRef.current.show("Avatar actualizado");
      })
      .catch(() => {
        toasRef.current.show("Error al Actualizar el avatar");
      });
  };

  const uploadImage = (uri) => {
    (async () => {
      setLoadingText("Actualizando Avatar");
      setLoading(true);
      const response = await fetch(uri);
      const blob = await response.blob();

      const refer = firebase.firebaseApp.storage().ref().child(`avatar/${uid}`);
      refer
        .put(blob)
        .then(() => {
          updatePhotoUrl();
        })
        .catch(() => {
          toasRef.current.show("Error al subir el avatar");
        });
    })();
  };

  const changeAvatar = () => {
    (async () => {
      const resultPermissions = await permissions.askAsync(
        permissions.CAMERA_ROLL
      );
      const resultPermissionsCamera =
        resultPermissions.permissions.cameraRoll.status;

      if (resultPermissionsCamera === "denied") {
        toasRef.current.show("Es necesario aceptar los permisos de la galeria");
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        if (result.cancelled) {
          toasRef.current.show("Se ha cancelado la seleccion de avatar");
        } else {
          uploadImage(result.uri);
        }
      }
    })();
  };

  return (
    <View style={styles.imageContainer}>
      <Avatar
        size="large"
        rounded
        backgroundColor="#ffffff"
        onPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../assets/icons/Anonimo.jpg")
        }
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Facebook"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 40,
  },
  userInfoAvatar: {
    backgroundColor: "#f2f2f2",
    marginRight: "5%",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
