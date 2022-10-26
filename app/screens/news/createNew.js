import React, { useState, useEffect, useRef, cloneElement } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import {
  db,
  collection,
  getDocs,
  dbSetDoc,
  addDoc,
  doc,
  query,
  where,
  firebaseauth,
} from "../../utils/dataBase/firabase";
import { ScrollView } from "react-native-gesture-handler";
import Moment from "moment";
import * as permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Background from "../../element/Background";

function CreateNew(props) {
  //atributos
  const [user, setUser] = useState(null);
  const [typeSelect, setTypeSelect] = useState(null);
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

  useEffect(() => {
    consultarTipologias();
    consultaDatosUsuario();
  }, []);

  //funciones
  const changeNew = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const changeType = (value) => {
    console.log("tipo seleccionadooooooooo", value);
    setTypeSelect({ ...typeIncident, value });
    console.log("tipo seleccionadooooooooo", typeSelect);
  };

  const createNew = async (value) => {
    const newRef = doc(db, "News", props.route.params.station.id);

    //changeType(value);

    await addDoc(collection(newRef, "NewsStation"), {
      title: "noticia reportada acerca de " + value.label,
      type: value,
      description: "descripcion x",
      dateC: state.dateC,
      gender: user.Gender,
      userId: user.UserID,
    })
      .then((data) => {
        console.log("noticia creada");
        props.navigation.navigate("ListNews");
      })
      .catch(() => {
        alert("la noticia no se pudo cargar");
      });
  };

  const consultaDatosUsuario = async () => {
    (async () => {
      var userf = null;
      const q = query(
        collection(db, "User"),
        where("UserID", "==", firebaseauth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userf = doc.data();
      });
      setUser(userf);
    })();
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
          selection: false,
        });
      });

      settypeInciden(types);
    })();
  };

  const renderItem = ({ item }) => (
    <Button
      title={item.label}
      type="outline"
      titleStyle={{ color: "#000000" }}
      buttonStyle={{
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: "#DDDDDD",
        width: 290,
        height: 60,
        borderRadius: 30,
        margin: 15,
        marginTop: 5,
      }}
      onPress={() => {
        createNew(item);
      }}
    />
  );

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
          <Text style={styles.textStyle}>Seleccione un incidente:</Text>
        </View>

        <View style={styles.inputFalgList}>
          <FlatList
            data={typeIncident}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
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
    padding: 30,
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
    margin: 15,
  },
  textStyle: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  inputFalgList: {
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
    width: 220,
    height: 220,
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
