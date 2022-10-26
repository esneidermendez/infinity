import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Button, ListItem, Avatar, Image, Card } from "react-native-elements";
import {
  db,
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
} from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";

export default class ListNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      newsUser: [],
    };
  }

  async componentDidMount() {
    await this.consultaUsuarios();
    await this.consultaNoticias();
  }

  consultaNoticias = async () => {
    const docRef = doc(db, "News", this.props.route.params.station.id);

    const q = await query(collection(docRef, "NewsStation"));
    let noticiasT = [];

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datosquery = snapshot.docs;

      datosquery.forEach((doc) => {
        // noticiasT.push(doc.data());
        if (noticiasT.length > 0) {
          let aux = noticiasT.find((data) => data.id === doc.id);
          if (!aux) {
            noticiasT.push({ ...doc.data(), id: doc.id });
          }
        } else {
          noticiasT.push({ ...doc.data(), id: doc.id });
        }
      });

      this.obtenerListadoNoticiasConUsuario(noticiasT);
      return unsubscribe;
    });
  };

  consultaUsuarios = async () => {
    let usrs = [];
    const querySnapshot = await getDocs(collection(db, "User"));
    querySnapshot.forEach((doc) => {
      const { Gender, Name, Ndocument, Tdocument } = doc.data();
      usrs.push({
        idUser: doc.id,
        Gender,
        Name,
        Ndocument,
        Tdocument,
      });
    });
    this.setState({ usuarios: usrs });
  };

  obtenerListadoNoticiasConUsuario = (noticias) => {
    let nU = [];
    noticias.forEach((n) => {
      const usu1 = this.state.usuarios.find(
        (u) => u !== null && n.userId == u.idUser
      );
      if (usu1) nU.push({ ...n, ...usu1 });
    });
    this.setState({ newsUser: nU });

    console.log("NOTICIAS", this.state);
  };

  render() {
    return (
      <View>
        <Button
          title="Registra una nueva noticia"
          type="outline"
          titleStyle={{ color: "#000000" }}
          buttonStyle={{
            borderWidth: 3,
            borderColor: "#000000",
            backgroundColor: "#DDDDDD",
            width: 300,
            borderRadius: 20,
            margin: 15,
            marginTop: 50,
            alignSelf: "center",
          }}
          onPress={() =>
            this.props.navigation.navigate("CreateNew", {
              station: this.props.route.params.station,
            })
          }
        />

        <ScrollView style={{ marginBottom: 70 }}>
          {this.state.newsUser.length > 0 &&
            this.state.newsUser.map((noticia) => (
              <Card title="CARD WITH DIVIDER">
                <View
                  style={{
                    flexDirection: "row",
                    height: 100,
                    padding: 15,
                  }}
                >
                  <Avatar
                    rounded
                    size="medium"
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/srmt-c750e.appspot.com/o/avatar%2FAnonimo.jpg?alt=media&token=64148d88-01c2-4425-96ed-849a1b39b915",
                    }}
                  />

                  <View
                    style={{
                      flex: 2,
                      height: 80,
                    }}
                  >
                    <Text key={noticia.id} style={{ marginLeft: 15 }}>
                      {noticia.Name}
                    </Text>
                    <Text key={noticia.id} style={{ marginLeft: 15 }}>
                      {noticia.dateC}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ margin: 5, fontSize: 16, fontWeight: "bold" }}>
                    {noticia.title}
                  </Text>
                  <Text>{noticia.type.description}</Text>

                  <Image
                    source={{
                      uri: noticia.type.image,
                    }}
                    style={{ width: 300, height: 200, margin: 10 }}
                    PlaceholderContent={<ActivityIndicator />}
                  />

                  <Text
                    style={{
                      margin: 5,
                      fontSize: 16,
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {noticia.type.label}
                  </Text>
                </View>
              </Card>
            ))}
        </ScrollView>
      </View>
    );
  }
}

//estilos
