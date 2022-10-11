import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { Button, ListItem, Avatar, Image } from "react-native-elements";
import styles from "../../assets/styles/stylesNews";
import { db, collection, getDocs, doc } from "../../utils/dataBase/firabase";
import { useNavigation } from "@react-navigation/native";

function ListNews(p) {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const { estacion } = p.route.params.station;
  const [noticia1, setNoticia1] = useState(null);
  const [newsUser, setNewsUser] = useState([]);

  useEffect(() => {
    consultaNoticias();
    consultaUsuarios();
    obtenerListadoNoticiasConUsuario();
  }, [news]);

  const consultaNoticias = () => {
    (async () => {
      const docRef = doc(db, "News", p.route.params.station.id);
      const docSnap = await getDocs(collection(docRef, "NewsStation"));
      const news = [];

      docSnap.forEach((querySnapshot) => {
        const { title, type, description, dateC, gender, userId } =
          querySnapshot.data();
        news.push({
          id: doc.id,
          title,
          type,
          description,
          dateC,
          gender,
          userId,
        });
        setNews(news);
      });
    })();
  };

  const consultaUsuarios = () => {
    (async () => {
      const usrs = [];
      const querySnapshot = await getDocs(collection(db, "User"));
      querySnapshot.forEach((doc) => {
        const { Email, Gender, Name, Ndocument, Tdocument } = doc.data();
        usrs.push({
          idUser: doc.id,
          Gender,
          Name,
          Ndocument,
          Tdocument,
        });
      });
      setUsers(usrs);
    })();
  };

  const obtenerListadoNoticiasConUsuario = () => {
    const nU = [];
    news.forEach((n) => {
      const usu1 = users.find((u) => u !== null && n.userId == u.idUser);
      if (usu1) nU.push({ ...n, ...usu1 });
    });
    setNewsUser(nU);
  };

  //Vista
  return (
    <ScrollView style={styles.contenedora}>
      <View style={styles.buttonContainer}>
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
          }}
          onPress={() =>
            navigation.navigate("CreateNew", {
              station: p.route.params.station,
            })
          }
        />
      </View>

      {newsUser.map((noticia) => (
        <ListItem
          key={noticia.id}
          bottomDivider
          style={{ margin: 3 }}
          onPress={() =>
            props.navigation.navigate("DetailNew", {
              station: p.route.params.station,
              newId: noticia.id,
              typeIncident: noticia.type.value,
            })
          }
        >
          <ListItem.Content key={noticia.id}>
            <View
              style={{
                flexDirection: "row",
                height: 100,
                padding: 20,
              }}
            >
              <Avatar
                rounded
                size="medium"
                style={{ width: 50, height: 50 }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKMA6QRdBuT1r7O4o23UHiMHsKsdDsg_nG9Q&usqp=CAU",
                }}
              />

              <View
                style={{
                  flex: 2,
                  height: 100,
                }}
              >
                <ListItem.Title key={noticia.id} style={{ marginLeft: 15 }}>
                  {noticia.Name}
                </ListItem.Title>
                <ListItem.Subtitle key={noticia.id} style={{ marginLeft: 15 }}>
                  {noticia.dateC}
                </ListItem.Subtitle>
              </View>
            </View>

            <View
              style={{
                width: "100%",
              }}
            >
              <Text>{noticia.description}</Text>
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://i.pinimg.com/originals/22/7a/9e/227a9e464dfbf82765b56b0599a7614b.jpg",
                  }}
                  style={{ width: 300, height: 200 }}
                  PlaceholderContent={<ActivityIndicator />}
                />

                <Text>{noticia.type.label}</Text>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}

//estilos

export default ListNews;
