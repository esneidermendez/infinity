import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import { validateEmail } from "../../utils/Validations";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../core/Loading";
import {
  firebaseauth,
  updateProfil,
  createUser,
  db,
  doc,
  dbSetDoc,
} from "../../utils/dataBase/firabase";

function RegisterForm() {
  const state = {
    value: null,
  };
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepPassword, setShowRepPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [Usu, setUsu] = useState({
    UserID: "",
    Email: "",
    Gender: "",
    Name: "",
    Ndocument: "",
    Tdocument: "",
    photoURL: "",
  });

  const createNewUsu = (uid, email) => {
    (async () => {
      await dbSetDoc(doc(db, "User", uid), {
        UserID: uid,
        Email: email,
        Gender: Usu.Gender,
        Name: Usu.Name,
        Ndocument: Usu.Ndocument,
        Tdocument: Usu.Tdocument,
        photoURL: Usu.photoURL,
      }).then(() => console.log("User added"));
    })();
  };

  //funciones
  const userNew = (name, value) => {
    setUsu({ ...Usu, [name]: value });
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const uploadImage = (genero) => {
    (async () => {
      const file = "";

      switch (genero) {
        case 0:
          file = "../../../assets/Man.png";
          break;
        case 1:
          file = "../../../assets/Woman.png";
          break;
        case 2:
          file = "../../../assets/Anonimo.png";
          break;
        default:
          break;
      }
    })();
  };

  const onSummit = () => {
    if (isChecked == false) {
      setLoading(false);
      alert("Por favor aceptar terminos y condiciones");
    } else {
      if (
        isEmpty(formData.email) ||
        isEmpty(formData.password) ||
        isEmpty(formData.repeatPassword) ||
        isEmpty(Usu.Gender) ||
        isEmpty(Usu.Name) ||
        isEmpty(Usu.Ndocument) ||
        isEmpty(Usu.Tdocument)
      ) {
        alert("Todos los campos son obligatorios");
      } else if (!validateEmail(formData.email)) {
        alert("El email no es valido");
      } else if (formData.password !== formData.repeatPassword) {
        alert("Las contraseñas deben ser iguales");
      } else if (size(formData.password) < 6) {
        alert("La contraseña debe tener minimo 6 caracteres");
      } else {
        setLoading(true);
        const update = {
          displayName: Usu.Name,
          photoURL: Usu.photoURL,
        };
        createUser(firebaseauth, formData.email, formData.password)
          .then((response) => {
            updateProfil(firebaseauth.currentUser, update)
              .then(() => {
                const uid = response.user.uid;
                uploadImage(Usu.Gender);
                createNewUsu(uid, formData.email);

                setLoading(false);
                navigation.navigate("validateSession");
              })
              .catch((err) => {
                setLoading(false);
              });
          })
          .catch((err) => {
            setLoading(false);
            alert("El usuario ya esta registrado, intente con otro");
          });
      }
    }
  };

  const Datos = [
    { label: "Hombre  ", value: 0 },
    { label: "Mujer  ", value: 1 },
    { label: "Otro  ", value: 2 },
  ];

  const Tdoc = [
    { label: "T.I  ", value: 0 },
    { label: "C.C  ", value: 1 },
    { label: "C.E  ", value: 2 },
  ];

  const radioButtons = (name, value) => {
    setUsu({ ...Usu, [name]: value });
  };

  return (
    <View style={styles.FormContainer}>
      <Input
        placeholder="Nombre completo"
        containerStyle={styles.InputFrom}
        onChangeText={(value) => userNew("Name", value)}
      />
      <Text style={styles.text}>Tipo de documento</Text>
      <RadioForm
        radio_props={Tdoc}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={"#E02A35"}
        onPress={(value) => radioButtons("Tdocument", Tdoc[value].label)}
      />
      <Input
        keyboardType="number-pad"
        placeholder="Numero de documento"
        containerStyle={styles.InputFrom}
        onChangeText={(value) => userNew("Ndocument", value)}
      />
      <Text style={styles.text}>Género</Text>
      <RadioForm
        radio_props={Datos}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={"#E02A35"}
        onPress={(value) => radioButtons("Gender", Datos[value].label)}
      />
      <Input
        placeholder="Correo electronico"
        keyboardType="email-address"
        containerStyle={styles.InputFrom}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.InputFrom}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.InputFrom}
        password={true}
        secureTextEntry={showRepPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepPassword(!showRepPassword)}
          />
        }
      />
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#E02A35" : undefined}
        />
        <Text style={styles.paragraph}>
          Acepto los {""}
          <Text
            style={styles.txtbtnRegister}
            onPress={() =>
              Linking.openURL(
                "https://docs.google.com/document/d/1B5FLWrn1K8G_WfOTMSKlSJ9YyFXFdImi8KWWfNhtfgo/edit?usp=sharing"
              )
            }
          >
            Terminos y condiciones {"\n \n"}
          </Text>
          de SMRT
        </Text>
      </View>
      <Button
        title="Registrarse"
        containerStyle={styles.txtbtnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSummit}
      />
      <Loading isVisible={loading} text="Creando Cuenta" />
    </View>
  );
}

function defaultFormValue() {
  return {
    nombreUsu: "",
    tdoc: "",
    doc: "",
    genero: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  FormContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  text: {
    marginBottom: 10,
  },
  InputFrom: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 25,
    width: "95%",
    alignItems: "center",
    marginBottom: "10%",
  },
  btnRegister: {
    backgroundColor: "#E02A35",
    width: 150,
    borderRadius: 50,
  },
  txtbtnRegister: {
    color: "#E02A35",
    fontWeight: "bold",
  },
  iconRight: {
    color: "#9e9e9e",
  },
  FormRadContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 30,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
  },
  paragraph: {
    fontSize: 15,
    justifyContent: "center",
  },
  checkbox: {
    margin: 8,
  },
});

export default RegisterForm;
