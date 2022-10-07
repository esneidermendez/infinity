import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.Overlay}
    >
      <View style={styles.View}>
        <ActivityIndicator size="large" color="#9e9e9e" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  Overlay: {
    height: 200,
    width: 300,
    backgroundColor: "#ffff",
    borderColor: "#9e9e9e",
    borderWidth: 2,
    borderRadius: 10,
  },
  View: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000000",
    textTransform: "uppercase",
    marginTop: 10,
  },
});

export default Loading;
