import React from "react";
import { Image, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Scroll() {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/srmt-c750e.appspot.com/o/permisos%2FGeolocalizaci%C3%B3n.png?alt=media&token=4aa4b3e2-55cc-49a8-9faf-ef4ee6d5d260",
    "https://firebasestorage.googleapis.com/v0/b/srmt-c750e.appspot.com/o/permisos%2FCamara.png?alt=media&token=bb7d9496-2790-4c82-b571-519868e73d2d",
    "https://firebasestorage.googleapis.com/v0/b/srmt-c750e.appspot.com/o/permisos%2FArchivos.png?alt=media&token=8523a0cf-6008-4302-a27d-4a8c75fcdcd2",
  ];
  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
<<<<<<< HEAD
      style={{ width, height: '80%' }}
=======
      style={{ width, height: "80%" }}
>>>>>>> 0bd8dd2534b7be6a9c293767ae747ed1a6a9661e
    >
      {images.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={{
            width,
<<<<<<< HEAD
            height: '80%',
            resizeMode: 'cover',
            alignItems: 'center',
            marginTop: '5%',
=======
            height: "80%",
            resizeMode: "cover",
            alignItems: "center",
            marginBottom: "5%",
            marginTop: "5%",
>>>>>>> 0bd8dd2534b7be6a9c293767ae747ed1a6a9661e
          }}
        />
      ))}
    </ScrollView>
  );
}
