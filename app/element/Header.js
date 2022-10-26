import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 27,
    color: '#E02A35',
    fontWeight: 'bold',
    marginTop:'5%',
    marginBottom: '9%',
    alignItems: 'center',
  },
})
