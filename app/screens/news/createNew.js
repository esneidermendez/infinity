import React, { useState, useEffect, useRef, cloneElement } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import {
  db,
  collection,
  getDocs,
  dbSetDoc,
  addDoc,
  doc,
  firebaseauth,
} from "../../utils/dataBase/firabase";
import { ScrollView } from "react-native-gesture-handler";
import Moment from "moment";
import * as permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

function CreateNew(props) {
  //atributos
  const [user, setUser] = useState(null);
  //estados
  const [state, setState] = useState({
    title: "",
    type: "",
    description: "",
    dateC: Moment().format("YYYY-MM-DD hh:mm a"),
    gender: "",
  });

  const [typeIncident, settypeInciden] = useState([]);

  const toastRef = useRef();

  //useeffect

  useEffect(() => {
    consultarTipologias();
    consultaDatosUsuario();
  }, []);

  //funciones
  const changeNew = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const createNew = async () => {
    if (state.title === "" || state.type === "" || state.description === "") {
      alert("Validacion Campos", "Por favor valide los campos");
    } else {
      const newRef = doc(db, "News", firebaseauth.currentUser.uid);
      console.log(newRef);
      await addDoc(collection(newRef, "NewsStation"), {
        title: state.title,
        type: state.type,
        description: state.description,
        dateC: state.dateC,
        gender: user.Gender,
        userId: user.UserID,
      })
        .then((data) => {
          alert("noticia cargada");
          props.navigation.navigate("ListNews");
        })
        .catch(() => {
          alert("la noticia no se pudo cargar");
        });
    }
  };

  const consultaDatosUsuario = async () => {
    let userf = null;
    const documentSnapshot = await getDocs(
      collection(db, "User", firebaseauth.currentUser.uid)
    );
    if (documentSnapshot) {
      console.log("User exists: ", documentSnapshot.exists);

      if (documentSnapshot.exists) {
        userf = documentSnapshot.data();
        console.log("User data: ", userf);
      }

      setUser(userf);
      console.log("usuario doc", user);
    }
  };

  const consultarTipologias = () => {
    (async () => {
      const types = [];

      const docRef = doc(db, "MobileSynchronization/TypesIncidents");
      const docSnap = await getDocs(collection(docRef, "types"));
      docSnap.forEach((doc) => {
        const { value, type } = doc.data();
        types.push({
          value: value,
          label: type,
        });
      });

      settypeInciden(types);
    })();
  };

  const openGalery = async () => {
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
        toasRef.current.show("Se ha cancelado la seleccion de imagen");
      } else {
        uploadImage(result.uri);
      }
    }
  };

  const uploadImage = (uri) => {
    (async () => {
      const response = await fetch(uri);
      const blob = await response.blob();

      const refer = firebase.firebaseApp
        .storage()
        .ref()
        .child(`news/${props.route.params.station.id}`);
      refer
        .put(blob)
        .then(() => {
          updatePhotoUrl();
        })
        .catch(() => {
          toastRef.current.show("Error al subirla imagen");
        });
    })();
  };

  const updatePhotoUrl = () => {
    firebase.firebaseApp
      .storage()
      .ref(`news/${props.route.params.station.id}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.firebaseauth.currentUser.updateProfile(update);
        toastRef.current.show("Avatar actualizado");
      })
      .catch(() => {
        toastRef.current.show("Error al Actualizar el avatar");
      });
  };

  //vista
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerText}>
        <Text h4>Reporta una noticia</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/img/Journalist-rafiki.png")}
        />
      </View>

      <View>
        <View style={styles.inputText}>
          <Input
            placeholder="Titulo de la noticia"
            leftIcon={{
              type: "font-awesome",
              name: "newspaper-o",
              color: "#E02A35",
              marginRight: 15,
              style: { marginRight: 15, paddingRight: 15 },
            }}
            onChangeText={(value) => changeNew("title", value)}
          />
        </View>

        <ScrollView style={styles.scrollTypes}>
          <View style={styles.FormRadContainer}>
            <RadioForm
              initial={-1}
              radio_props={typeIncident}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"#E02A35"}
              onPress={(value) => changeNew("type", typeIncident[value])}
            />
          </View>
        </ScrollView>

        <View style={styles.inputCamara}>
          <Text>Toma una evidencia del robo</Text>
          <Icon
            reverse
            name="camera-wireless"
            type="material-community"
            color="#E02A35"
            onPress={() => openGalery()}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Descripcion"
            leftIcon={{
              type: "font-awesome",
              name: "exclamation",
              color: "#E02A35",
              marginRight: 25,
              style: { marginRight: 15, paddingRight: 15 },
            }}
            onChangeText={(value) => changeNew("description", value)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Crear Noticia "
            type="outline"
            titleStyle={{ color: "#E02A35" }}
            buttonStyle={{
              borderWidth: 3,
              borderColor: "#000000",
              backgroundColor: "#DDDDDD",
              width: 200,
              borderRadius: 20,
            }}
            onPress={() => createNew()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 50,
  },
  containerText: {
    textAlign: "center",
    flexDirection: "column-reverse",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
  inputContainer: {
    alignContent: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  inputText: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  inputCamara: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginEnd: 10,
  },
  input: {
    borderColor: "blue",
  },
  button: {
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#5A3D28",
    width: 200,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 5,
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
    width: 120,
    height: 120,
  },
  FormRadContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  scrollTypes: {
    padding: 10,
    height: 150,
    backgroundColor: "#E2E2E2",
    borderBottomColor: "#E80F0F",
    borderRadius: 15,
  },
});

export default CreateNew;
