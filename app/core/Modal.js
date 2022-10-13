import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

function Modal(props) {
  const { isVisible, setIsVisible, children } = props;
  const closeModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
}
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#fff",
    width: "90%",
    height: "auto",
  },
});
export default Modal;
