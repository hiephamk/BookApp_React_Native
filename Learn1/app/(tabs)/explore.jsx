import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function explore() {
  return (
    <View style={styles.container}>
      <Text>explore</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding:10,
    },
});