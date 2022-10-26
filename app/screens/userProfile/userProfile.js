import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import {
  storage,
  getRef,
  UploadBytes,
  DownloadURL,
  firebaseauth,
  updateProfil,
  db,
  doc,
  dbSetDoc,
} from "../../utils/dataBase/firabase";
import * as ImagePicker from "expo-image-picker";

export default function UserProfile(props) {
  const {
    userInfo: { photoURL, displayName, email, uid },
    setLoading,
    setLoadingText,
  } = props;

  const updatePhotoUrl = (url) => {
    const update = {
      photoURL: url,
    };
    updateProfil(firebaseauth.currentUser, update)
      .then(() => {
        const dbRef = doc(db, "User", firebaseauth.currentUser.uid);
        dbSetDoc(
          dbRef,
          {
            photoURL: url,
          },
          { merge: true }
        )
          .then((data) => {
            setLoading(false);
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  const uploadImage = (uri) => {
    (async () => {
      setLoadingText("Actualizando Avatar");
      setLoading(true);
      const storageRef = getRef(storage, `avatar/${uid}`);
      await UploadBytes(storageRef, uri).then(async (snap) => {
        const url = await DownloadURL(storageRef);
        updatePhotoUrl(url);
      });
    })();
  };

  const xhrRequest = (uri) => {
    return new Promise((resolver, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolver(xhr.response);
        }
      };

      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    });
  };
  const changeAvatar = () => {
    (async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [40, 40],
        quality: 1,
      });
      if (result.cancelled) {
        toasRef.current.show("Se ha cancelado la seleccion de avatar");
      } else {
        xhrRequest(result.uri)
          .then((resolver) => {
            uploadImage(resolver);
          })
          .catch((error) => {
            console.log(error);
          });
        //      uploadImage(fileName);
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
