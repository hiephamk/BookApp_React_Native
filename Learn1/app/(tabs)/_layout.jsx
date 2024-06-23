import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { TabBarIcon1 } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout(){
  return (
    <Tabs>
        <Tabs.Screen name='home' options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={Colors} />
          ),
        }}/>
        <Tabs.Screen name='explore' options={{
            title:'Explore',
            tabBarIcon:({color, focused})=>(
                <TabBarIcon name={focused ? 'browsers' : 'browsers-outline'} color={Colors} />
             ),
        }}/>
            
        <Tabs.Screen name='profile' options={{
            title:'Profile',
            tabBarIcon: ({ color, focused}) => (
                <TabBarIcon name={focused ? 'people-circle' : 'people-circle-outline'} color={Colors} />
            ),
            }} />

    </Tabs>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
});