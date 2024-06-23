import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function home() {
  return (
    <View style={styles.container}>
      <Text>home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
    textContainer: {
       
    },
    Text: {
        fontSize: 14,
        color: "blue",
    },
});