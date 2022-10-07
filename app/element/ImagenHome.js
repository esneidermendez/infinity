import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function ImagenHome() {
  return (
    <Image
      source={require('../assets/img/bogota-4463698_1920.jpg')}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '60%',
  },
})
