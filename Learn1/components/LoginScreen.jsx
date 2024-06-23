import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView>
        <View style={{alignItems: "center"}}>
          <Image style={styles.image} source={require('./../assets/images/adaptive-icon.png')}/>
        </View>

    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        alignItems: "center",
    },
    image: {
        width:220,
        height:450,
        borderRadius: 20,
        borderWidth: 6,
        borderColor:'#000',
    },
});