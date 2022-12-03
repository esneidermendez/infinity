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
import Loading from "../../core/Loading";

export default class ListNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      usuarios: [],
      newsUser: [],
    };
  }

  async componentDidMount() {
    this.notificacionPushRiskStation(this.props.route.params.station);
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
      const { Gender, Name, Ndocument, Tdocument, photoURL, displayName } =
        doc.data();
      usrs.push({
        idUser: doc.id,
        Gender,
        Name,
        Ndocument,
        Tdocument,
        photoURL,
        displayName,
      });
    });
    this.setState({ usuarios: usrs });
  };

  obtenerListadoNoticiasConUsuario = (noticias) => {
    let nU = [];
    this.setState({ newsUser: nU });

    noticias.forEach((n) => {
      const usu1 = this.state.usuarios.find(
        (u) => u !== null && n.userId == u.idUser
      );
      if (usu1) nU.push({ ...n, ...usu1 });
    });
    this.setState({ newsUser: nU });
    this.setState({ loading: false });
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

  notificacionPushRiskStation = (station) => {
    switch (station.risk) {
      case 1:
        this.notificacionPush(
          "¡TEN CUIDADO ESTACION CON RIESGO BAJO!",
          "1.Evite dormirse." +
            "\n" +
            "2.Evite mencionar datos personales y de trabajo." +
            "\n" +
            "3.Guarda tus pertenencias de valor 📱👝💍💻." +
            "\n"
        );
        break;

      case 2:
        this.notificacionPush(
          "¡TEN CUIDADO ESTACION CON RIESGO MEDIO!",
          "1.Evite hacerse en zonas donde haya muchas personas." +
            "\n" +
            "2.No entable conversación con desconocidos." +
            "\n" +
            "3.Evite dormirse." +
            "\n" +
            "4.Guarda tus pertenencias de valor 📱👝💍💻."
        );
        break;

      case 3:
        this.notificacionPush(
          "¡TEN CUIDADO ESTACION CON RIESGO ALTO!",
          "1.Evite hacerse en zonas donde haya muchas personas." +
            "\n" +
            "2.No entable conversación con desconocidos." +
            "\n" +
            "2.Evite dormirse." +
            "\n" +
            "4.Guarda tus pertenencias de valor 📱👝💍💻." +
            "5.Evite mencionar datos personales y de trabajo."
        );
        break;
      default:
        this.notificacionPush(
          "¡TEN CUIDADO EN LA ESTACION!",
          "1.Evite hacerse en zonas donde haya muchas personas." +
            "\n" +
            "2.No entable conversación con desconocidos." +
            "\n" +
            "2.Evite dormirse." +
            "\n" +
            "4.Guarda tus pertenencias de valor 📱👝💍💻." +
            "5.Evite mencionar datos personales y de trabajo."
        );
    }
  };

  notificacionPush = (titleNotification, mensagge) => {
    this.props.navigation.navigate("Notifications", {
      title: titleNotification,
      body: mensagge,
      seconds: 2,
    });
  };

  render() {
    return (
      <View>
        <Loading isVisible={this.state.loading} text={"Cargando"} />

        <Button
          title="Registra una nueva noticia"
          type="outline"
          titleStyle={{ color: "#000000" }}
          buttonStyle={{
            borderWidth: 3,
            borderColor: "#000000",
            borderRadius: 20,
            backgroundColor: "#DDDDDD",
            width: "80%",
            margin: 5,
            marginTop: "15%",
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
                    source={
                      noticia.photoURL
                        ? { uri: noticia.photoURL }
                        : require("../../assets/icons/Anonimo.jpg")
                    }
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
