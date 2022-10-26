import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RadioForm from "react-native-simple-radio-button";
import { Button, Input, Text, Icon } from "react-native-elements";
import {
  db,
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
} from "../../utils/dataBase/firabase";
import Moment from "moment";

function DetailNew(props) {
  const inicialState = {
    id: "",
    title: "",
    type: "",
    description: "",
    dateC: Moment().format("YYYY-MM-DD hh:mm a"),
    gender: "",
  };

  //estados
  const [state, setState] = useState(inicialState);

  const [typeIncident, settypeInciden] = useState([]);

  //funciones
  const changeNew = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const getNewById = async (id) => {
    const dbref = firebase.dbFirestore
      .collection("News")
      .doc(props.route.params.station.id)
      .collection("NewsStation")
      .doc(id);
    const doc = await dbref.get();
    const newStation = doc.data();

    setState({ ...newStation, id: doc.id });
    console.log(state);
  };

  const getTypesIncidents = async () => {
    const types = [];

    firebase.dbFirestore
      .collection("MobileSynchronization")
      .doc("TypesIncidents")
      .collection("types")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          const { value, type } = doc.data();
          types.push({
            value: value,
            label: type,
          });
        });
        settypeInciden(types);
      });
  };

  useEffect(() => {
    getTypesIncidents();
    getNewById(props.route.params.newId);
  }, []);

  //funciones

  const deleteNew = async () => {
    const dbref = firebase.dbFirestore
      .collection("News")
      .doc(props.route.params.station.id)
      .collection("NewsStation")
      .doc(state.id);
    await dbref.delete();

    props.navigation.navigate("ListNews");
  };

  const updateNew = async () => {
    if (state.title === "" || state.type === "" || state.decription === "") {
      Alert.alert("Validacion Campos", "Por favor valide los campos");
    } else {
      const dbref = firebase.dbFirestore
        .collection("News")
        .doc(props.route.params.station.id)
        .collection("NewsStation")
        .doc(state.id);

      await dbref.set({
        id: state.id,
        title: state.title,
        type: state.type,
        description: state.description,
        dateC: state.dateC,
      });

      setState(inicialState);
      props.navigation.navigate("ListNews");
    }
  };

  //vista
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerText}>
        <Text h4 style={styles.text}>
          EDICIÓN DE NOTICIA
        </Text>
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
            value={state.title}
            onChangeText={(value) => changeNew("title", value)}
          />
        </View>

        <ScrollView style={styles.scrollTypes}>
          <View style={styles.FormRadContainer}>
            <RadioForm
              initial={props.route.params.typeIncident}
              radio_props={typeIncident}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"#E02A35"}
              onPress={(value) => changeNew("type", typeIncident[value])}
            />
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputMultiline}
            autoComplete={true}
            placeholder="Descripción"
            onChangeText={(value) => changeNew("description", value)}
            value={state.description}
            multiline={true}
            numberOfLines={3}
            maxLength={150}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.iconButton}>
            <Icon
              reverse
              size={30}
              name="md-checkmark"
              type="ionicon"
              color="#4281BF"
              onPress={() => updateNew()}
            />
          </View>

          <View style={styles.iconButton}>
            <Icon
              reverse
              name="md-trash"
              type="ionicon"
              color="#E02A35"
              size={30}
              onPress={() => deleteNew()}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 15,
  },
  containerText: {
    alignContent: "center",
    flexDirection: "column-reverse",
    marginTop: 20,
    marginLeft: 50,
  },
  text: {
    marginTop: 20,
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
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
  },
  inputMultiline: {
    lineHeight: 20,
    flex: 2,
    textAlignVertical: "top",
  },
  inputText: {
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
  },
  button: {
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#5A3D28",
    width: 200,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
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
    width: 130,
    height: 130,
  },
  iconButton: {
    marginLeft: 30,
    marginRight: 30,
  },
  scrollTypes: {
    padding: 10,
    height: 150,
    backgroundColor: "#E2E2E2",
    borderBottomColor: "#E80F0F",
    borderRadius: 15,
    marginLeft: 50,
    marginRight: 50,
  },
  FormRadContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailNew;
