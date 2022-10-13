import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  VictoryBar,
  VictoryPie,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
} from "victory-native";
import { db, collection, getDocs, doc } from "../../utils/dataBase/firabase";

export default function StationStatistics(props) {
  const navigation = useNavigation();

  const [news, setNews] = useState([]);
  const [typesIncidents, setTypesIncidents] = useState([]);
  const [data, setDatas] = useState([]);
  const [option, setOptions] = useState([]);

  useEffect(() => {
    searchNews();
    searchTypesIncidents();
    generarColores();
    configurarGrafica();
  }, []);

  const searchNews = () => {
    (async () => {
      const docRef = doc(db, "News", props.route.params.stationId);
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
      });
      setNews(news);
    })();
  };
  const searchTypesIncidents = async () => {
    (async () => {
      const docRef = doc(db, "MobileSynchronization/TypesIncidents");
      const docSnap = await getDocs(collection(docRef, "types"));
      const types = [];
      docSnap.forEach((querySnapshot) => {
        const { value, type } = querySnapshot.data();
        types.push({
          value: value,
          label: type,
        });
      });
      setTypesIncidents(types);
    })();
  };
  //Vista
  let totalNews = news.length;
  const myTypesIncidents = typesIncidents.map(function (elementType) {
    const countNewForTypes = { x: "", count: 0, y: 0 };
    countNewForTypes.x = elementType.label;
    news.map(function (elementNew) {
      console.log("countNewForTypes::::::::::::::::::::::::::::::");
      console.log(countNewForTypes);
      if (elementNew.type.label == elementType.label) {
        countNewForTypes.count = countNewForTypes.count + 1;
        countNewForTypes.y = countNewForTypes.count / totalNews;
      }
      return countNewForTypes;
    });
    if (countNewForTypes.count == 0) {
      countNewForTypes.x = "";
      countNewForTypes.y = 0;
    }
    return countNewForTypes;
  });
  console.log("My objeto para gráficas");
  console.log(myTypesIncidents);

  const generarColores = () => {
    var colores = ["#cdcdcd", "#ffa726", "#e65100", "#bf360c", "#ffa726"];

    const miles = colores.filter(function (element) {
      return element;
    });
    console.log("miles");
    console.log(miles);
    return colores;
  };
  const configurarGrafica = () => {
    const data = {
      labels: myTypesIncidents.labelFort,
      datasets: [
        {
          data: myTypesIncidents.count,
          backgroundColor: generarColores(),
        },
      ],
    };
    const opciones = {
      responsive: true,
      maintainAspectRatio: false,
    };
    setOptions(opciones);
    setDatas(data);
  };

  return (
    <ScrollView>
      <View>
        <VictoryPie colorScale={generarColores()} data={myTypesIncidents} innerRadius={70} labelRadius={100} style={{ labels: { fontSize: 13, fill: "white" } }} />
        <View>
          <VictoryChart>
            <VictoryGroup>
              <VictoryBar />
              <VictoryBar />
            </VictoryGroup>
          </VictoryChart>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedora: {
    padding: 10,
  },
  button: {
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#5A3D28",
    width: 300,
    borderRadius: 10,
    margin: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
});
