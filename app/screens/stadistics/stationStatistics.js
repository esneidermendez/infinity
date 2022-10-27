import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import { theme } from '../../core/theme';
import { useNavigation } from "@react-navigation/native";
import {
  VictoryBar,
  VictoryPie,
  VictoryLabel,
  VictoryTheme,
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
      if (elementNew.type.label === elementType.label) {
        countNewForTypes.count = countNewForTypes.count + 1;
        countNewForTypes.y = countNewForTypes.count / totalNews;
      }
      return countNewForTypes;
    });
    if (countNewForTypes.count == 0) {
      countNewForTypes.x = " ";
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
    <ScrollView source={require('../../assets/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}>
      <Card title="CARD WITH DIVIDER">
      <View style={styles.containerText}>
        <Text h4>Reporte por tipo de incidentes</Text>
      </View>
      <View style={{
            width: "125%",
            alignSelf: "center",}}>
        <VictoryPie
          padAngle={({ datum }) => datum.y}
          animate={{
            duration: 2000
          }}
          innerRadius={80}
          labelRadius={100}
          colorScale={generarColores()}
          data={myTypesIncidents}
        />
      </View>  
      <View style={styles.containerText}>
        <Text h4>Cantidad de reportes por tipo de incidentes</Text>
      </View>
      <View>
          <VictoryChart theme={VictoryTheme.material} domainPadding={25}>
            <VictoryGroup>
              <VictoryBar style={{ data: { fill:"#c43a31" } }}
                  data={myTypesIncidents} />
            </VictoryGroup>
          </VictoryChart>
        </View>
      
      </Card>
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
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  }
});
