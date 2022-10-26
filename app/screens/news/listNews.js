import React from "react";
import { View, ScrollView, Text, ActivityIndicator, Alert } from "react-native";
import { Button, Avatar, Image, Card, Icon } from "react-native-elements";
import {
  db,
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  firebaseauth,
  deleteDoc,
} from "../../utils/dataBase/firabase";
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
      const { Gender, Name, Ndocument, Tdocument, photoURL } = doc.data();
      usrs.push({
        idUser: doc.id,
        Gender,
        Name,
        Ndocument,
        Tdocument,
        photoURL,
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

    //  console.log("NOTICIAS", this.state);
  };

  crearAlertaEliminar = (idNoticia) =>
    Alert.alert("Eliminar Noticia", "¿Esta seguro de eliminar la noticia?", [
      {
        text: "SI",
        onPress: () => this.eliminarNoticia(idNoticia),
      },
      {
        text: "NO",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);

  eliminarNoticia = async (idNoticia) => {
    console.log("ID", idNoticia);

    await deleteDoc(
      doc(
        db,
        "News/" +
          this.props.route.params.station.id +
          "/" +
          "NewsStation/" +
          idNoticia
      )
    );

    await this.consultaNoticias();
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
            borderRadius: 20,
            backgroundColor: "#DDDDDD",
            width: 300,
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
                      uri: noticia.photoURL,
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

                  {noticia.idUser === firebaseauth.currentUser.uid ? (
                    <Button
                      buttonStyle={{
                        backgroundColor: "#f5f5f5",
                        borderWidth: 1,
                        borderColor: "#212121",
                        borderRadius: 20,
                        shadowColor: "#bdbdbd",
                        shadowOpacity: 0.2,
                        elevation: 6,
                      }}
                      icon={<Icon name="delete" size={25} color="#e53935" />}
                      onPress={() => this.crearAlertaEliminar(noticia.id)}
                    />
                  ) : (
                    <></>
                  )}
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
