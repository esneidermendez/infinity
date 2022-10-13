import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "react-native-elements";
import {
  firebaseauth,
  db,
  collection,
  getDocs,
} from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";
import UserProfile from "../userProfile/userProfile";
import UserOption from "../profile/UserOption";
import Loading from "../../core/Loading";

function CerrarSesion() {
  const [userInfo, setuserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const user = firebaseauth.currentUser;
      setuserInfo(user);
    })();
  }, []);

  const click = () => {
    firebaseauth.signOut();
    navigation.navigate("validateSession");
  };

  return (
    <View style={styles.contenedor}>
      {userInfo && (
        <UserProfile
          userInfo={userInfo}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
        />
      )}
      <UserOption
        userInfo={userInfo}
        setLoading={setLoading}
        setLoadingText={setLoadingText}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Cerrar Sesion"
          type="outline"
          titleStyle={{ color: "#fff" }}
          buttonStyle={{
            backgroundColor: "#E02A35",
            width: 300,
            borderRadius: 20,
            margin: 15,
          }}
          onPress={() => click()}
        />
      </View>
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    borderWidth: 3,
    width: 200,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  tinyLogo: {
    width: 350,
    height: 350,
  },
  contenedor: {
    backgroundColor: "white",
    height: "100%",
  },
});

export default CerrarSesion;
