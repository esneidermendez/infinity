import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Modal from "../../core/Modal";
import ChangeName from "./change/changeName";
import ChangePassword from "./change/changePassword";
import ChangeEmail from "./change/changeEmail";
import ChangeGender from "./change/changeGender";
import { firebaseauth, db, doc, getDoc } from "../../utils/dataBase/firabase";
import { useEffect } from "react";

function UserOption(props) {
  const { userInfo, setLoading, setLoadingText } = props;
  const [Usu, setUsu] = useState();
  const [showModal, setshowModal] = useState(false);
  const [Datos, setDatos] = useState([]);
  const [renderComponent, setrenderComponent] = useState(null);

  useEffect(() => {
    getGender();
  });

  const selectedComponent = (key) => {
    switch (key) {
      case "Name":
        setrenderComponent(
          <ChangeName
            displayName={userInfo.displayName}
            uid={userInfo.uid}
            setshowModal={setshowModal}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
        setshowModal(true);
        break;
      case "Genero":
        getGender();
        setrenderComponent(
          <ChangeGender
            displayName={userInfo.displayName}
            gender={Usu}
            uid={userInfo.uid}
            setshowModal={setshowModal}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
        setshowModal(true);
        break;
      case "Email":
        setrenderComponent(
          <ChangeEmail
            email={userInfo.email}
            uid={userInfo.uid}
            setshowModal={setshowModal}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
        setshowModal(true);
        break;
      case "Contraseña":
        setrenderComponent(
          <ChangePassword
            setshowModal={setshowModal}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        );
        setshowModal(true);
        break;
      default:
        setrenderComponent(null);
        setshowModal(true);
        break;
    }
  };

  const getGender = async () => {
    const docRef = doc(db, "User", firebaseauth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { Gender, Name, Ndocument, Tdocument, photoURL, displayName } =
        docSnap.data();
      let initial = 0;
      switch (Gender) {
        case "Hombre  ":
          initial = 0;
          break;
        case "Mujer  ":
          initial = 1;
          break;
        case "Otro  ":
          initial = 2;
          break;
        default:
          break;
      }
      setUsu(initial);
    }
  };
  const menuOptions = generateOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          bottomDivider
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        >
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setshowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Cambiar Nombre Completo",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      onPress: () => selectedComponent("Name"),
    },
    {
      title: "Cambiar genero",
      iconType: "material-community",
      iconNameLeft: "account-box-multiple",
      onPress: () => selectedComponent("Genero"),
    },
    {
      title: "Cambiar Correo",
      iconType: "material-community",
      iconNameLeft: "at",
      onPress: () => selectedComponent("Email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      onPress: () => selectedComponent("Contraseña"),
    },
  ];
}

// Styles
const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});

export default UserOption;
