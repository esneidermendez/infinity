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
import Loading from "../../core/Loading";

function CreateNew(props) {
  //atributos
  const [user, setUser] = useState(null);
  const [typeSelect, setTypeSelect] = useState(null);
  const [loading, setLoading] = useState(true);
  //estados
  const [state, setState] = useState({
    title: "",
    type: "",
    description: "",
    dateC: Moment().format("YYYY-MM-DD hh:mm a"),
    gender: "",
  });

  const [typeIncident, settypeInciden] = useState([]);

  useEffect(() => {
    consultarTipologias();
    consultaDatosUsuario();
  }, []);

  //funciones

  const createNew = async (value) => {
    setLoading(true);
    const newRef = doc(db, "News", props.route.params.station.id);
    await addDoc(collection(newRef, "NewsStation"), {
      title: "Noticia sobre: " + value.label,
      type: value,
      dateC: state.dateC,
      gender: user.Gender,
      userId: user.UserID,
    })
      .then((data) => {
        console.log("noticia creada");
        setLoading(false);
        props.navigation.goBack();
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
        const { value, type, image, description } = doc.data();
        types.push({
          value: value,
          label: type,
          image: image,
          description: description,
        });
      });

      settypeInciden(types);
      setLoading(false);
    })();
  };

  const renderItem = ({ item }) => (
    <View style={[{ width: "90%", margin: 3 }]}>
      <Button
        title={item.label}
        type="outline"
        titleStyle={{ color: "#000000" }}
        buttonStyle={{
          borderWidth: 1,
          borderColor: "#000000",
          backgroundColor: "#DDDDDD",
          width: "97%",
          height: 50,
          borderRadius: 30,
          margin: 3,
          marginTop: 5,
        }}
        onPress={() => {
          createNew(item);
        }}
      />
    </View>
  );

  //vista
  return (
    <ScrollView style={styles.container}>
      <Loading isVisible={loading} text={"Cargando"} />

      <View style={styles.containerText}>
        <Text h4>REPORTAR UNA NOTICIA</Text>
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
    margin: "5%",
  },
  containerText: {
    alignContent: "center",
    flexDirection: "column-reverse",
    marginTop: "10%",
    margin: "4%",
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
    marginBottom: 10,
  },
  textStyle: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputFalgList: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 9,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});

export default CreateNew;
